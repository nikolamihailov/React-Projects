package com.flow.infrastructure.mail;

import org.springframework.context.ApplicationEvent;

public class EmailEvent extends ApplicationEvent {

  private final String to;
  private final String firstName;
  private final String lastName;
  private final String subject;
  private final String text;

  public EmailEvent(Object source, String to, String firstName, String lastName, String subject,
      String text) {
    super(source);
    this.to = to;
    this.firstName = firstName;
    this.lastName = lastName;
    this.subject = subject;
    this.text = text;
  }

  public String getTo() {
    return to;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public String getSubject() {
    return subject;
  }

  public String getText() {
    return text;
  }
}
