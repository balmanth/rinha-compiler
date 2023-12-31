import * as Core from '@xcheme/core';

import { ErrorTypes } from './types';

const errorMessages = {
  [ErrorTypes.DUPLICATE_IDENTIFIER]: 'Duplicate identifier `{0}` at line {1}, column {2}.',
  [ErrorTypes.UNEXPECTED_TOKEN]: 'Unexpected token `{0}` at line {1}, column {2}.',
  [ErrorTypes.UNEXPECTED_SYNTAX]: 'Unexpected syntax `{0}` at line {1}, column {2}.',
  [ErrorTypes.UNDEFINED_IDENTIFIER]: 'Identifier `{0}` at line {1}, column {2} was not defined.',
  [ErrorTypes.INVALID_TUPLE]: 'Argument `{0}` at line {1}, column {2} is not a tuple.',
  [ErrorTypes.INVALID_CALL]: 'Unable to call `{0}` at line {1}, column {2}.',
  [ErrorTypes.INVALID_ASSIGNMENT]: 'Invalid assignment to `{0}` at line {1}, column {2}.',
  [ErrorTypes.INVALID_OPERATION]: 'Operation at line {1}, column {2} is not valid.',
  [ErrorTypes.UNSUPPORTED_OPERATION]: 'Operation at line {1}, column {2} is not supported.',
  [ErrorTypes.UNSUPPORTED_REFERENCE]: 'Unable to use `{0}` at line {1}, column {2} before its definition.',
  [ErrorTypes.MISSING_ARGUMENT]: 'Missing argument at line {1}, column {2}.',
  [ErrorTypes.EXTRA_ARGUMENT]: 'Extra argument at line {1}, column {2} is not necessary.',
  [ErrorTypes.ASSERTION_FAILED]: 'Assertion `{0}` at line {1}, column {2} has been failed.'
};

export const formatMessage = (message: string, fragment: Core.Fragment) => {
  const location = fragment.location;

  return message.replace(/(\{[0-2]\})/g, (match: string): string => {
    switch (match) {
      case '{0}':
        return fragment.data.replace(/\n/g, '\\n');

      case '{1}':
        return (location.line.begin + 1).toString();

      case '{2}':
        return (location.column.begin + 1).toString();
    }

    return match;
  });
};

export const getMessage = (value: number, fragment: Core.Fragment) => {
  const message = errorMessages[value as ErrorTypes];

  if (!message) {
    throw `Error message (code: ${value}) doesn't found.`;
  }

  return formatMessage(message, fragment);
};

export const printLogs = (logs: Core.LogList): void => {
  console.error('ERRORS:');

  for (const log of logs) {
    const location = log.fragment.location;
    const message = getMessage(log.value, log.fragment);

    console.error(`\t[${location.name}]: ${message}`);
  }
};
