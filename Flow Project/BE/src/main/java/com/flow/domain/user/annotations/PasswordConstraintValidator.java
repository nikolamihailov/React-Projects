package com.flow.domain.user.annotations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.passay.*;

import java.util.Arrays;
import java.util.List;

public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {

  @Override
  public boolean isValid(String password, ConstraintValidatorContext context) {

    PasswordValidator validator = new PasswordValidator(Arrays.asList(
        new LengthRule(8, 16),
        new CharacterRule(EnglishCharacterData.UpperCase, 1),
        new CharacterRule(EnglishCharacterData.LowerCase, 1),
        new CharacterRule(EnglishCharacterData.Digit, 1),
        new CharacterRule(EnglishCharacterData.Special, 1),
        new WhitespaceRule()
    ));

    RuleResult result = validator.validate(new PasswordData(password));

    if (result.isValid()) {
      return true;
    }

    List<String> messages = validator.getMessages(result);

    String messageTemplate = String.join(",", messages);

    context.buildConstraintViolationWithTemplate(messageTemplate)
        .addConstraintViolation()
        .disableDefaultConstraintViolation();

    return false;
  }
}