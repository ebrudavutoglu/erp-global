import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create test user
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      passwordHash:
        "$2b$10$K0mVWq6wfYl8X3qC0X9c4eZ1q2R3S4T5U6V7W8X9Y0Z1", // password: test123
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
    },
  });

  console.log(`✅ Created user: ${user.email}`);

  // Create test workspace
  const workspace = await prisma.workspace.upsert({
    where: { slug: "test-workspace" },
    update: {},
    create: {
      name: "Test Workspace",
      slug: "test-workspace",
      ownerId: user.id,
    },
  });

  console.log(`✅ Created workspace: ${workspace.name}`);

  // Add user as workspace member
  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      userId: user.id,
      role: "OWNER",
    },
  });

  console.log(`✅ Added user to workspace`);

  // Create sample database (CRM: Contacts)
  const database = await prisma.database.create({
    data: {
      workspaceId: workspace.id,
      name: "Contacts",
      slug: "contacts",
      description: "Contact management database",
      icon: "👥",
      color: "blue",
    },
  });

  console.log(`✅ Created database: ${database.name}`);

  // Create fields for database
  const fields = await Promise.all([
    prisma.field.create({
      data: {
        databaseId: database.id,
        name: "Name",
        slug: "name",
        type: "TEXT",
        required: true,
        order: 0,
      },
    }),
    prisma.field.create({
      data: {
        databaseId: database.id,
        name: "Email",
        slug: "email",
        type: "EMAIL",
        order: 1,
      },
    }),
    prisma.field.create({
      data: {
        databaseId: database.id,
        name: "Phone",
        slug: "phone",
        type: "PHONE",
        order: 2,
      },
    }),
    prisma.field.create({
      data: {
        databaseId: database.id,
        name: "Company",
        slug: "company",
        type: "TEXT",
        order: 3,
      },
    }),
    prisma.field.create({
      data: {
        databaseId: database.id,
        name: "Status",
        slug: "status",
        type: "STATUS",
        order: 4,
        settings: {
          options: [
            { id: "1", label: "Lead", color: "#CCCCCC" },
            { id: "2", label: "Customer", color: "#10B981" },
            { id: "3", label: "Lost", color: "#EF4444" },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${fields.length} fields`);

  // Create sample records
  await Promise.all([
    prisma.record.create({
      data: {
        databaseId: database.id,
        createdById: user.id,
        values: {
          [fields[0].id]: "John Doe",
          [fields[1].id]: "john@example.com",
          [fields[2].id]: "+1-234-567-8900",
          [fields[3].id]: "Acme Corp",
          [fields[4].id]: "1", // Lead
        },
      },
    }),
    prisma.record.create({
      data: {
        databaseId: database.id,
        createdById: user.id,
        values: {
          [fields[0].id]: "Jane Smith",
          [fields[1].id]: "jane@example.com",
          [fields[2].id]: "+1-234-567-8901",
          [fields[3].id]: "Tech Solutions",
          [fields[4].id]: "2", // Customer
        },
      },
    }),
  ]);

  console.log(`✅ Created sample records`);

  // Create default view
  const view = await prisma.view.create({
    data: {
      databaseId: database.id,
      name: "All Contacts",
      type: "TABLE",
    },
  });

  // Add fields to view
  for (const field of fields) {
    await prisma.viewField.create({
      data: {
        viewId: view.id,
        fieldId: field.id,
      },
    });
  }

  console.log(`✅ Created default view with fields`);

  console.log("✨ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
