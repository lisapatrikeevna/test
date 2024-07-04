interface ValidationRule {
  required?: string;
  maxLength?: {
    value: number;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}

export const nameValidation: ValidationRule = {
  required: "fill in the name field",
  maxLength: {
    value: 20,
    message: 'Max symbol 20 ',
  },
  minLength: {
    value: 4,
    message: 'Min symbol 2',
  },
  pattern: {
    value: /^[A-Z].*/,
    message: 'enter text in upper case'
  }
}


export const emailValidation: ValidationRule = {
  required: "fill in the email field",
  maxLength: {
    value: 20,
    message: 'Max symbol 20 '
  },
  minLength: {
    value: 2,
    message: 'Min symbol 2'
  },
  pattern: {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: 'invalid email'
  }
}

export const passwordValidation: ValidationRule = {
  required: "fill in the password field",
  maxLength: {
    value: 20,
    message: 'Max symbol 20'
  },
  minLength: {
    value: 5,
    message: 'Min symbol 8'
  },
  pattern: {
    value: /^(?=.*[A-Z])(?=.*\d).{8,20}$/,
    message: 'Password must contain at least one digit and one uppercase letter'
  }
}