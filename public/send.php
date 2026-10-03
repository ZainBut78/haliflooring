<?php
// Receives the website enquiry forms and emails them to the business.
// Lives in /public so it is copied to the site root on every build and
// deployed next to index.html. Namecheap shared hosting runs PHP out of the box.

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

// Where enquiries go, and the sender address. The sender should be an address
// on the site's own domain, otherwise Gmail is far more likely to junk it.
$to   = 'Halifloorings@gmail.com';
$from = 'noreply@haliflooring.co.uk';

function fail($code, $message) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'Method not allowed');
}

// The form posts JSON; fall back to ordinary form fields.
$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot: real visitors never see or fill this field, bots usually do.
// Pretend it worked so the bot gets no signal to adapt to.
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

// Strip line breaks so a field can never inject extra mail headers.
function clean($value, $max = 200) {
    $value = is_string($value) ? $value : '';
    $value = trim(preg_replace('/[\r\n]+/', ' ', $value));
    return mb_substr($value, 0, $max);
}

$name     = clean($data['name'] ?? '');
$phone    = clean($data['phone'] ?? '', 40);
$email    = clean($data['email'] ?? '');
$postcode = clean($data['postcode'] ?? '', 20);
$service  = clean($data['service'] ?? '');
$details  = trim(mb_substr((string)($data['details'] ?? ''), 0, 3000));

if ($name === '' || $phone === '' || $postcode === '') {
    fail(422, 'Please fill in your name, phone number and postcode.');
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'That email address does not look right.');
}

$body = "New enquiry from the Hali Flooring website\n\n"
      . "Name:     $name\n"
      . "Phone:    $phone\n"
      . "Email:    " . ($email !== '' ? $email : '(not given)') . "\n"
      . "Postcode: $postcode\n"
      . "Flooring: " . ($service !== '' ? $service : '(not given)') . "\n\n"
      . "Details:\n" . ($details !== '' ? $details : '(none)') . "\n";

$headers = [
    "From: Hali Flooring Website <$from>",
    'Content-Type: text/plain; charset=UTF-8',
];
// Replying in Gmail goes straight to the customer when they gave an email.
if ($email !== '') {
    $headers[] = "Reply-To: $name <$email>";
}

$subject = "Website enquiry: $name ($postcode)";
$subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

if (!mail($to, $subject, $body, implode("\r\n", $headers))) {
    fail(500, 'Sorry, we could not send your request. Please call or WhatsApp us instead.');
}

echo json_encode(['ok' => true]);
