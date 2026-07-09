/**
 * Double Joy Cookies — Website Backend
 * Handles: custom order form submissions + footer newsletter signups.
 *
 * SETUP: see the "Google Backend Setup" section in Double_Joy_Cookies_Notes.md
 * for the full click-by-click walkthrough.
 */

// TODO: confirm this is Emily's real address (placeholder pulled from her Instagram bio, which was truncated)
const NOTIFY_EMAIL = 'doublejoycookies@gmail.com';

const PHOTO_FOLDER_NAME = 'Double Joy Cookies — Order Photos';

const ORDERS_HEADERS = [
  'Timestamp', 'Name', 'Email', 'Phone', 'Occasion', 'Quantity', 'Need By',
  'Theme', 'Names/Wording', 'Design Direction', 'Budget', 'Delivery', 'Photo Links',
  'Handoff Shape', 'Handoff Flavor', 'Handoff Icing Color', 'Handoff Style', 'Handoff Notes',
  'Estimated Price', 'Gift Bows'
];
const SIGNUP_HEADERS = ['Timestamp', 'Email'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.type === 'newsletter') {
      handleNewsletter(data);
    } else {
      handleOrder(data);
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  } else {
    // Header-sync: if this sheet already existed (e.g. from before we added
    // new fields like "Estimated Price"/"Gift Bows"), append any headers
    // that are missing from row 1 so old sheets pick up new columns
    // automatically instead of needing manual edits.
    syncHeaders(sheet, headers);
  }
  return sheet;
}

function syncHeaders(sheet, headers) {
  const lastCol = sheet.getLastColumn();
  const existing = lastCol > 0
    ? sheet.getRange(1, 1, 1, lastCol).getValues()[0]
    : [];
  const missing = headers.filter(h => existing.indexOf(h) === -1);
  if (missing.length) {
    sheet.getRange(1, existing.length + 1, 1, missing.length).setValues([missing]);
  }
}

function handleNewsletter(data) {
  const sheet = getSheet('Newsletter Signups', SIGNUP_HEADERS);
  sheet.appendRow([new Date(), data.email || '']);
}

function handleOrder(data) {
  const photoLinks = savePhotos(data.photos || [], data.name || 'Unknown');
  const sheet = getSheet('Orders', ORDERS_HEADERS);
  const occasion = data.occasion || '';
  const estimatedPrice = formatEstimate(data);
  const giftBows = data.giftBows ? 'Yes' : 'No';

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    occasion,
    data.qty || '',
    data.needBy || '',
    data.theme || '',
    data.names || '',
    data.design || '',
    data.budget || '',
    data.delivery || '',
    photoLinks.join('\n'),
    (data.handoff && data.handoff.shape) || '',
    (data.handoff && data.handoff.flavor) || '',
    (data.handoff && data.handoff.color) || '',
    (data.handoff && data.handoff.style) || '',
    (data.handoff && data.handoff.notes) || '',
    estimatedPrice,
    giftBows
  ]);

  sendNotificationEmail(data, occasion, photoLinks, estimatedPrice, giftBows);
}

// Builds a readable "Tier — $Price" string from the design-tool handoff data,
// e.g. "Standard — $80/dozen". Blank if the customer didn't come through the
// design tool. This is always an estimate — Emily confirms final pricing.
function formatEstimate(data) {
  const tier = data.handoff && data.handoff.tier;
  const price = data.handoff && data.handoff.estPrice;
  if (!tier && !price) return '';
  return [tier, price].filter(Boolean).join(' — ');
}

function savePhotos(photos, customerName) {
  if (!photos.length) return [];

  const foldersIter = DriveApp.getFoldersByName(PHOTO_FOLDER_NAME);
  const rootFolder = foldersIter.hasNext() ? foldersIter.next() : DriveApp.createFolder(PHOTO_FOLDER_NAME);

  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HHmm');
  const orderFolder = rootFolder.createFolder(`${customerName} — ${stamp}`);

  const links = [];
  photos.forEach((p, i) => {
    try {
      const bytes = Utilities.base64Decode(p.data);
      const blob = Utilities.newBlob(bytes, p.mimeType || 'image/jpeg', p.filename || `photo-${i + 1}.jpg`);
      const file = orderFolder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      links.push(file.getUrl());
    } catch (err) {
      links.push('(upload failed: ' + err + ')');
    }
  });
  return links;
}

function sendNotificationEmail(data, occasion, photoLinks, estimatedPrice, giftBows) {
  const subject = `New Custom Order Request — ${data.name || 'Unknown'}`;
  const lines = [
    'New order request from the website:',
    '',
    `Name: ${data.name || ''}`,
    `Email: ${data.email || ''}`,
    `Phone: ${data.phone || ''}`,
    '',
    `Occasion: ${occasion}`,
    `Quantity: ${data.qty || ''}`,
    `Need By: ${data.needBy || ''}`,
    '',
    `Theme: ${data.theme || ''}`,
    `Names/Wording: ${data.names || ''}`,
    '',
    `Design Direction: ${data.design || ''}`,
    `Budget: ${data.budget || ''}`,
    `Delivery: ${data.delivery || ''}`,
    `Gift Bows: ${giftBows}`,
  ];

  if (data.handoff && data.handoff.shape) {
    lines.push(
      '',
      'From the "Dream Up Your Cookies" tool:',
      `Shape: ${data.handoff.shape}`,
      `Flavor: ${data.handoff.flavor}`,
      `Icing: ${data.handoff.color}`,
      `Style: ${data.handoff.style}`,
      `Notes: ${data.handoff.notes || ''}`
    );
  }

  if (estimatedPrice) {
    lines.push(
      '',
      `Estimated Price: ${estimatedPrice} (estimate only — Emily will confirm final pricing)`
    );
  }

  if (photoLinks.length) {
    lines.push('', 'Inspiration Photos:', ...photoLinks);
  }

  lines.push('', '— This order is also logged in the "Orders" tab of the spreadsheet.');

  MailApp.sendEmail(NOTIFY_EMAIL, subject, lines.join('\n'));
}
