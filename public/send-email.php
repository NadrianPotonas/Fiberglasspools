<?php

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');

function respond($status, $success, $message)
{
    http_response_code($status);

    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);

    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Method not allowed.');
}

// Limit the request size.
$raw = file_get_contents('php://input', false, null, 0, 20001);

if ($raw === false || strlen($raw) > 20000) {
    respond(413, false, 'Your message is too large.');
}

$input = json_decode($raw, true);

if (!is_array($input)) {
    respond(400, false, 'Invalid request.');
}

function readField($input, $key, $maxLength)
{
    $value = $input[$key] ?? '';

    if (!is_string($value)) {
        respond(400, false, 'Invalid form field.');
    }

    $value = trim($value);

    if (strlen($value) > $maxLength) {
        respond(400, false, 'One of the form fields is too long.');
    }

    return $value;
}

$name = readField($input, 'name', 400);
$email = readField($input, 'email', 254);
$subject = readField($input, 'subject', 600);
$message = readField($input, 'message', 16000);

// Optional honeypot field for forms that include it.
$website = readField($input, 'website', 500);

if ($website !== '') {
    respond(400, false, 'Unable to submit this enquiry.');
}

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    respond(400, false, 'Please complete all required fields.');
}

// Reject line breaks in values used in email headers.
if (
    preg_match('/[\r\n\x00]/', $name) ||
    preg_match('/[\r\n\x00]/', $email) ||
    preg_match('/[\r\n\x00]/', $subject)
) {
    respond(400, false, 'Invalid contact details.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, false, 'Please enter a valid email address.');
}

// Destination for enquiries.
$to = 'info@justfibreglasspools.co.za';

// Must be a real mailbox authorised by your hosting mail service.
$from = 'info@justfibreglasspools.co.za';

$emailSubject = 'Website Enquiry - ' . $subject;

// Encode the subject to support non-ASCII names.
$encodedSubject = '=?UTF-8?B?' . base64_encode($emailSubject) . '?=';

$emailBody =
    "New enquiry from the Just Fibreglass Pools website\n\n" .
    "----------------------------------------\n\n" .
    "Name: " . $name . "\n" .
    "Email: " . $email . "\n" .
    "Subject: " . $subject . "\n\n" .
    "Message:\n\n" .
    $message . "\n\n" .
    "----------------------------------------\n" .
    "Sent from the Just Fibreglass Pools contact form.\n";

// The Vue form includes phone and location in the message.
$headers = [
    'From: Just Fibreglass Pools Website <' . $from . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit'
];

try {
    $sent = mail(
        $to,
        $encodedSubject,
        $emailBody,
        implode("\r\n", $headers),
        '-f' . $from
    );
} catch (Throwable $error) {
    error_log('Pool enquiry mail error: ' . $error->getMessage());
    respond(500, false, 'Unable to send your enquiry. Please contact us directly.');
}

if (!$sent) {
    error_log('Pool enquiry: mail() returned false.');
    respond(500, false, 'Unable to send your enquiry. Please try again later.');
}

respond(200, true, 'Your enquiry has been submitted successfully.');