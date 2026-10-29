<?php
  // Contact Form Server Endpoint Fallback
  header('Content-Type: text/plain; charset=utf-8');

  $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
  $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
  $subject = isset($_POST['subject']) ? strip_tags(trim($_POST['subject'])) : '';
  $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

  if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo "Harap lengkapi semua kolom formulir.";
    exit;
  }

  $receiving_email = "rikojpr7@gmail.com";
  $email_subject = "Pesan Portofolio: " . $subject;
  $email_body = "Anda menerima pesan baru dari formulir kontak portofolio:\n\n" .
                "Nama: $name\n" .
                "Email: $email\n" .
                "Subjek: $subject\n\n" .
                "Pesan:\n$message\n";
  $headers = "From: noreply@portofolio.local\r\n" .
             "Reply-To: $email\r\n" .
             "X-Mailer: PHP/" . phpversion();

  @mail($receiving_email, $email_subject, $email_body, $headers);

  echo "OK";
?>