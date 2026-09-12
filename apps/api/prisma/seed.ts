import * as dotenv from "dotenv";
dotenv.config();

console.log("STEP 1: script started");
console.log("STEP 1b: DATABASE_URL loaded?", process.env.DATABASE_URL ? "YES" : "NO — MISSING");

import { PrismaClient, AppStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("STEP 2: main() started, connecting...");

  // ============================================================
  // COMPANY
  // ============================================================
  const company = await prisma.company.upsert({
    where: { id: "yakimel-empire-llc" },
    update: {},
    create: {
      id: "yakimel-empire-llc",
      name: "Yakimel Empire",
      legalName: "Yakimel Empire LLC",
    },
  });
  console.log("STEP 3: company created/found:", company.id);

  // ============================================================
  // DEPARTMENTS (with sub-departments)
  // ============================================================
  const technology = await prisma.department.upsert({
    where: { slug: "technology" },
    update: {},
    create: {
      companyId: company.id,
      name: "Technology",
      slug: "technology",
      description: "DigiMarketApp, HealthHyr, BrandForge AI, OmniPresence AI, and future apps",
    },
  });

  const eznob = await prisma.department.upsert({
    where: { slug: "eznob" },
    update: {},
    create: {
      companyId: company.id,
      name: "EZNOB",
      slug: "eznob",
    },
  });

  await prisma.department.upsert({
    where: { slug: "eznob-office-services" },
    update: {},
    create: {
      companyId: company.id,
      parentDepartmentId: eznob.id,
      name: "Office Services",
      slug: "eznob-office-services",
    },
  });

  await prisma.department.upsert({
    where: { slug: "eznob-business-services" },
    update: {},
    create: {
      companyId: company.id,
      parentDepartmentId: eznob.id,
      name: "Business Services",
      slug: "eznob-business-services",
    },
  });

  const dreamInk = await prisma.department.upsert({
    where: { slug: "dream-ink-digitals" },
    update: {},
    create: {
      companyId: company.id,
      name: "Dream Ink Digitals",
      slug: "dream-ink-digitals",
    },
  });

  await prisma.department.upsert({
    where: { slug: "dream-ink-books" },
    update: {},
    create: {
      companyId: company.id,
      parentDepartmentId: dreamInk.id,
      name: "Books",
      slug: "dream-ink-books",
    },
  });

  await prisma.department.upsert({
    where: { slug: "dream-ink-digital-products" },
    update: {},
    create: {
      companyId: company.id,
      parentDepartmentId: dreamInk.id,
      name: "Digital Products",
      slug: "dream-ink-digital-products",
    },
  });

  await prisma.department.upsert({
    where: { slug: "dream-ink-shopify-etsy" },
    update: {},
    create: {
      companyId: company.id,
      parentDepartmentId: dreamInk.id,
      name: "Shopify / Etsy",
      slug: "dream-ink-shopify-etsy",
    },
  });

  const gallery = await prisma.department.upsert({
    where: { slug: "yakimel-gallery" },
    update: {},
    create: {
      companyId: company.id,
      name: "Yakimel Gallery",
      slug: "yakimel-gallery",
    },
  });

  await prisma.department.upsert({
    where: { slug: "gallery-clothing" },
    update: {},
    create: {
      companyId: company.id,
      parentDepartmentId: gallery.id,
      name: "Clothing",
      slug: "gallery-clothing",
    },
  });

  await prisma.department.upsert({
    where: { slug: "gallery-templates" },
    update: {},
    create: {
      companyId: company.id,
      parentDepartmentId: gallery.id,
      name: "Templates",
      slug: "gallery-templates",
    },
  });

  await prisma.department.upsert({
    where: { slug: "gallery-creative-products" },
    update: {},
    create: {
      companyId: company.id,
      parentDepartmentId: gallery.id,
      name: "Creative Products",
      slug: "gallery-creative-products",
    },
  });
  console.log("STEP 4: departments created");

  // ============================================================
  // ROLES
  // ============================================================
  const roleNames = [
    "Super Admin",
    "Executive Admin",
    "Company Admin",
    "Finance",
    "HR",
    "IT Support",
    "Department Manager",
    "Employee",
  ];

  const roles: Record<string, { id: string }> = {};
  for (const name of roleNames) {
    roles[name] = await prisma.role.upsert({
      where: { name },
      update: {},
      create: {
        name,
        isSystem: true,
        description: `${name} role`,
      },
    });
  }
  console.log("STEP 5: roles created");

  // ============================================================
  // APPS (under Technology)
  // ============================================================
  await prisma.app.upsert({
    where: { slug: "digimarketapp" },
    update: {},
    create: {
      departmentId: technology.id,
      name: "DigiMarketApp",
      slug: "digimarketapp",
      domain: "digimarketapp.com",
      description: "Multi-vendor digital products marketplace",
      status: AppStatus.LIVE,
    },
  });

  await prisma.app.upsert({
    where: { slug: "healthhyr" },
    update: {},
    create: {
      departmentId: technology.id,
      name: "HealthHyr",
      slug: "healthhyr",
      domain: "healthhyr.com",
      description: "Healthcare job marketplace",
      status: AppStatus.LIVE,
    },
  });

  await prisma.app.upsert({
    where: { slug: "brandforge-ai" },
    update: {},
    create: {
      departmentId: technology.id,
      name: "BrandForge AI",
      slug: "brandforge-ai",
      description: "AI-powered business features SaaS",
      status: AppStatus.DEVELOPMENT,
    },
  });

  await prisma.app.upsert({
    where: { slug: "omnipresence-ai" },
    update: {},
    create: {
      departmentId: technology.id,
      name: "OmniPresence AI",
      slug: "omnipresence-ai",
      description: "Automated social media content engine",
      status: AppStatus.DEVELOPMENT,
      progressPercent: 72,
    },
  });
  console.log("STEP 6: apps created");

  // ============================================================
  // SUPER ADMIN USER (Winnie) — CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN
  // ============================================================
  const seedPassword = "ChangeMe_Immediately_123!";
  const passwordHash = await bcrypt.hash(seedPassword, 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@yakimelempire.com" },
    update: {},
    create: {
      email: "admin@yakimelempire.com",
      passwordHash,
      isActive: true,
    },
  });

  await prisma.employee.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      departmentId: technology.id,
      roleId: roles["Super Admin"].id,
      fullName: "Winnie",
      title: "Owner / Super Admin",
    },
  });

  console.log("STEP 7: Seed complete.");
  console.log(`Super Admin login: admin@yakimelempire.com / ${seedPassword}`);
  console.log("⚠ Change this password immediately after first login.");
}

main()
  .catch((e) => {
    console.error("SEED FAILED:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("STEP 8: disconnected, exiting.");
  });