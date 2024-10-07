package com.flow.infrastructure.mail;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  private final ApplicationEventPublisher eventPublisher;

  public EmailService(ApplicationEventPublisher eventPublisher) {
    this.eventPublisher = eventPublisher;
  }

  public void sendEmail(String to, String firstName, String lastName, String subject, String text) {
    EmailEvent emailEvent = new EmailEvent(this, to, firstName, lastName, subject, text);
    eventPublisher.publishEvent(emailEvent);
  }
}
