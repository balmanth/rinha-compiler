import * as Core from '@xcheme/core';

import * as Errors from './errors';

export type VarCallableType<T extends Core.Types> = Core.Node<T> | VarCallbackType<T>;

export type VarCallbackType<T extends Core.Types> = (scope: Scope<T>, args: Core.Node<T>) => VarValueType<T>;

export type VarSingleType<T extends Core.Types> = undefined | number | string | boolean | VarCallableType<T>;

export type VarTupleType<T extends Core.Types> = [VarValueType<T>, VarValueType<T>];

export type VarValueType<T extends Core.Types> = VarSingleType<T> | VarTupleType<T>;

type VarMapType<T extends Core.Types> = {
  [identifier: string]: VarValueType<T>;
};

type VarRecordType<T extends Core.Types> = {
  identifier: string;
  value: VarValueType<T>;
};

export class Scope<T extends Core.Types> {
  private variables: VarMapType<T> = {};

  private parent: Scope<T> | undefined;

  constructor(parent?: Scope<T>) {
    this.parent = parent;
  }

  createCustomVariable(identifier: string, callback: VarCallbackType<T>): void {
    this.variables[identifier] = callback;
  }

  createVariable(node: Core.Node<T>, value: VarValueType<T>): void {
    const identifier = node.fragment.data;

    this.variables[identifier] = value;
  }

  updateVariable(node: Core.Node<T>, value: VarValueType<T>): VarValueType<T> {
    const identifier = node.fragment.data;

    if (identifier in this.variables) {
      return (this.variables[identifier] = value);
    }

    if (this.parent) {
      return this.parent.updateVariable(node, value);
    }

    throw Errors.getMessage(Errors.Types.UNDEFINED_IDENTIFIER, node.fragment);
  }

  readVariable(node: Core.Node<T>): VarValueType<T> {
    const identifier = node.fragment.data;

    if (identifier in this.variables) {
      return this.variables[identifier];
    }

    if (this.parent) {
      return this.parent.readVariable(node);
    }

    throw Errors.getMessage(Errors.Types.UNDEFINED_IDENTIFIER, node.fragment);
  }

  *[Symbol.iterator](): Iterator<VarRecordType<T>> {
    for (const identifier in this.variables) {
      yield {
        identifier,
        value: this.variables[identifier]
      };
    }
  }
}
