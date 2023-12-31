import { BaseScope, BaseScopeOptions } from '../core/scope';
import { ValueTypes } from '../core/types';
import { Cache } from './cache';

type VariablesMap = {
  [identifier: string]: ValueTypes;
};

type VariableEntry = {
  identifier: string;
  value: ValueTypes;
};

export class Scope extends BaseScope {
  private variables: VariablesMap = {};

  cache: Cache | undefined;

  constructor(parentScope?: Scope, options?: BaseScopeOptions) {
    super(parentScope, options);

    this.cache = parentScope?.cache;
  }

  get parent(): Scope {
    return super.parent as Scope;
  }

  createVariable(identifier: string, value: ValueTypes): void {
    this.variables[identifier] = value;
  }

  updateVariable(identifier: string, value: ValueTypes): ValueTypes {
    if (identifier in this.variables) {
      return (this.variables[identifier] = value);
    }

    if (this.parent) {
      return this.parent.updateVariable(identifier, value);
    }

    return value;
  }

  readVariable(identifier: string): ValueTypes {
    if (identifier in this.variables) {
      return this.variables[identifier];
    }

    if (this.parent) {
      return this.parent.readVariable(identifier);
    }

    return undefined;
  }

  *[Symbol.iterator](): Iterator<VariableEntry> {
    for (const identifier in this.variables) {
      yield {
        identifier,
        value: this.variables[identifier]
      };
    }
  }
}
