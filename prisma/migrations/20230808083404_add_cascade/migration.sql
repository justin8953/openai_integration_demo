-- DropForeignKey
ALTER TABLE "PermissionsOnRoles" DROP CONSTRAINT "PermissionsOnRoles_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionsOnRoles" DROP CONSTRAINT "PermissionsOnRoles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "RolesOnUsers" DROP CONSTRAINT "RolesOnUsers_roleId_fkey";

-- DropForeignKey
ALTER TABLE "RolesOnUsers" DROP CONSTRAINT "RolesOnUsers_userId_fkey";

-- AddForeignKey
ALTER TABLE "PermissionsOnRoles" ADD CONSTRAINT "PermissionsOnRoles_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsOnRoles" ADD CONSTRAINT "PermissionsOnRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnUsers" ADD CONSTRAINT "RolesOnUsers_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnUsers" ADD CONSTRAINT "RolesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
