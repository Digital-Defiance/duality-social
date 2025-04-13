// src/mocks/models/role-model.ts

import { IRole, IRoleDocument } from '@duality-social/duality-social-lib';
import { Types } from 'mongoose';
import { makeRole } from '../../fixtures/role';
import { createMockDocument } from '../create-mock-document';

/**
 * Define a constructable type for RoleModel.
 */
type RoleModelConstructor = new (roleData: Partial<IRole>) => IRoleDocument;

/**
 * Define the Mocked RoleModel interface by extending jest.MockedClass with the constructor type.
 * Removed the explicit 'new' signature as jest.MockedClass already includes it.
 */
interface MockedRoleModel extends jest.MockedClass<RoleModelConstructor> {
  create: jest.Mock<Promise<IRoleDocument>, [Partial<IRole>]>;
  findById: jest.Mock<Promise<IRoleDocument | null>, [string]>;
  find: jest.Mock<Promise<IRoleDocument[]>, [unknown]>;
  findByIdAndUpdate: jest.Mock<
    Promise<IRoleDocument | null>,
    [string, Partial<IRole>, unknown]
  >;
  findByIdAndDelete: jest.Mock<Promise<IRoleDocument | null>, [string]>;
}

/**
 * Create a constructor function for RoleModel to support `new RoleModel()`.
 * Use Object.assign to merge the constructor mock with static method mocks.
 */
export const RoleModel: MockedRoleModel = Object.assign(
  // Constructor mock
  jest.fn((roleData: Partial<IRole>) => {
    const role = makeRole(roleData);
    return createMockDocument<IRoleDocument>(() => role);
  }),
  // Static method mocks
  {
    create: jest.fn<Promise<IRoleDocument>, [Partial<IRole>]>(
      async (roleData: Partial<IRole>) => {
        const role = makeRole(roleData);
        return createMockDocument<IRoleDocument>(() => role);
      },
    ),

    findById: jest.fn<Promise<IRoleDocument | null>, [string]>(
      async (id: string) => {
        if (!id) return null;
        const role = makeRole({ _id: new Types.ObjectId(id) });
        return createMockDocument<IRoleDocument>(() => role);
      },
    ),

    find: jest.fn<Promise<IRoleDocument[]>, [unknown]>(
      async (query: unknown) => {
        const roles = [makeRole(), makeRole()];
        return roles.map((role) =>
          createMockDocument<IRoleDocument>(() => role),
        );
      },
    ),

    findByIdAndUpdate: jest.fn<
      Promise<IRoleDocument | null>,
      [string, Partial<IRole>, unknown]
    >(async (id: string, updateData: Partial<IRole>, options: unknown) => {
      const existingRole = await RoleModel.findById(id);
      if (!existingRole) return null;

      // Create a new role object with updated data
      const updatedRole = Object.assign(existingRole.toObject(), updateData);

      // Return a mocked document with full Mongoose properties/methods
      return createMockDocument<IRoleDocument>(
        () => updatedRole as unknown as IRoleDocument,
      );
    }),

    findByIdAndDelete: jest.fn<Promise<IRoleDocument | null>, [string]>(
      async (id: string) => {
        const role = await RoleModel.findById(id);
        if (!role) return null;

        // Simulate deletion by returning the role
        return role;
      },
    ),
  },
) as MockedRoleModel;
