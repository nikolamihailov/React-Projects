package com.flow.infrastructure.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class EmailEventListener {

  private final JavaMailSender mailSender;

  public EmailEventListener(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  @Async
  @EventListener
  public void handleEmailEvent(EmailEvent event) {
    MimeMessage message = mailSender.createMimeMessage();
    try {
      MimeMessageHelper helper = new MimeMessageHelper(message, true);
      helper.setTo(event.getTo());
      helper.setSubject(event.getSubject());

      String fullName = event.getFirstName() + " " + event.getLastName();
      String htmlBody =
          "<div style='background-color: #ffe066; padding: 20px; text-align: center;height: 100%'>"
              + "<h1 style='color: #8B0401;'>Hello, " + fullName + "</h1>"
              + "<p style='color: #8B0401;'>" + event.getText() + "</p>"
              + "</div>";

      helper.setText(htmlBody, true);
      helper.setFrom("flow@support.com");

      mailSender.send(message);
    } catch (MessagingException e) {
      throw new IllegalStateException("Failed to send HTML email", e);
    }
  }
}
