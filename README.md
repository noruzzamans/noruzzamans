# Hi there, I'm Md. Noruzzaman (Rubel) 👋

**Senior WordPress Systems & Core Engineer | WordPress 7.2 Release Squad (Test Lead) | Yoast Care Fund Recipient**

[![WordPress Core](https://img.shields.io/badge/WordPress_7.2-Release_Squad_(Test_Lead)-21759B?style=for-the-badge&logo=wordpress&logoColor=white)](https://make.wordpress.org/core/tag/7-2/)
[![Yoast Care Fund](https://img.shields.io/badge/Yoast_Care_Fund-Recipient-A4286A?style=for-the-badge&logo=yoast&logoColor=white)](https://yoast.com/)
[![WordPress.org Profile](https://img.shields.io/badge/WordPress.org-47+_Trac_Changesets-0073AA?style=for-the-badge&logo=wordpress&logoColor=white)](https://profiles.wordpress.org/noruzzaman/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/noruzzaman/)

---

## ⚡ Executive Summary

I am a Senior Systems and Core Software Engineer specializing in **high-reliability WordPress architecture, modern PHP/JavaScript, and distributed edge computing**. 

- 🏛️ **Official Test Lead for the WordPress 7.2 Release Squad** (the final major WordPress release of 2026).
- 🎖️ **Noteworthy Contributor to WordPress 7.0** with **47+ SVN changeset revisions** merged into WordPress Core trunk.
- 🏅 **Yoast Care Fund Recipient** for sustained open-source contributions across the global WordPress ecosystem.
- 🌐 **Enterprise Open-Source Contributor** across **Automattic** (WooCommerce, Jetpack, Action Scheduler), **Google Site Kit**, **10up** (ElasticPress), **Human Made** (S3-Uploads), and **WP Engine** (WPGraphQL, Faust.js).
- ☁️ **Edge Cloud & Ecommerce Architect**: Engineered distributed Shopify applications on Cloudflare Workers, React Router v7, GraphQL, and D1 SQLite backed by 600+ passing automated tests.

---

## 🏆 Shipped & Merged Contributions (Production Code)

### 👑 WordPress Core & Default Themes
- **[WordPress/wordpress-develop (SVN r64009)](https://core.trac.wordpress.org/changeset/64009)** — Tests: Use `assertWPError()` in post test suites *(Committed by Lance Willett)*.
- **[WordPress/wordpress-develop (SVN r63637)](https://core.trac.wordpress.org/changeset/63637)** — Tests: Use `assertWPError()` in includesPost tests *(Committed by Lance Willett)*.
- **[WordPress/wordpress-develop (SVN r63630)](https://core.trac.wordpress.org/changeset/63630)** — Code Quality: Correct `@param` annotation for variadic parameter in Block Processor *(Committed by Sergey Biryukov)*.
- **[WordPress/wordpress-develop (SVN r63615)](https://core.trac.wordpress.org/changeset/63615)** — Tests: Use `assertWPError()` in classic-to-block menu converter tests.
- **[WordPress/gutenberg (PR #83782)](https://github.com/WordPress/gutenberg/pull/83782)** — Tests: Use strict assertions in override script tests *(Merged into trunk by Lance Willett)*.
- **[WordPress/ipsum (PR #76)](https://github.com/WordPress/ipsum/pull/76)** — Fix missing footer in Index Sidebar template pattern for the upcoming 7.2 default theme.
- **[WordPress/ipsum (PR #109)](https://github.com/WordPress/ipsum/pull/109)** — Semantic heading modernization in overlay contents pattern.
- **[WordPress/plugin-check (PR #1476)](https://github.com/WordPress/plugin-check/pull/1476) & [PR #1479](https://github.com/WordPress/plugin-check/pull/1479)** — Unit test suites for `Readme_Utils` and `Ignore_Matcher` file filtering utilities.

### 🌐 Automattic & WooCommerce Ecosystem
- **[woocommerce/woocommerce-gateway-stripe (PR #5976, #5959, #5952, #5941)](https://github.com/woocommerce/woocommerce-gateway-stripe/pull/5976)** — Comprehensive unit test suites for payment token classes (SEPA IBAN, ACSS, BECS, CashApp, Link, Amazon Pay) under PHPStan Level 8 *(Merged by Dale du Preez)*.
- **[woocommerce/woocommerce (PR #68636)](https://github.com/woocommerce/woocommerce/pull/68636)** — Admin CSV import/export security hardening and MIME-type validation.
- **[Automattic/jetpack (PR #52252)](https://github.com/Automattic/jetpack/pull/52252)** — Password Checker: Information entropy calculations and profile substring validation.
- **[wp-graphql/wp-graphql (PR #4321)](https://github.com/wp-graphql/wp-graphql/pull/4321)** — Unit test coverage for GraphQL core `Utils` helper methods.

### 🤖 Generative AI & Next-Gen WordPress Tooling
- **[WordPress/ai (PR #1056, #1051, #1038, #1033, #1022)](https://github.com/WordPress/ai/pull/1056)** — Unit test coverage across Logging integration, AI Request Log schemas, semver upgrades, and deactivation routines.
- **[WordPress/ai-provider-for-google (PR #48)](https://github.com/WordPress/ai-provider-for-google/pull/48)** — Composer packaging hygiene and `.gitattributes` archive exclusions.
- **[Fueled/ai-provider-for-ollama (PR #101)](https://github.com/Fueled/ai-provider-for-ollama/pull/101)** — Health-check discovery timeouts and error resilience *(Merged by Darin Kotter)*.
- **[GatherPress/gatherpress (PR #2315, #2321, #2337)](https://github.com/GatherPress/gatherpress/pull/2337)** — Autoloader subsystems, path traversal guards, and migration engine testing.

---

## 🟢 Active In-Flight Contributions (Under Review)

- **[WordPress/wordpress-develop (PR #13832)](https://github.com/WordPress/wordpress-develop/pull/13832)** — 🟢 *Ready for Review:* Document deliberate loose object comparisons in bookmark tests (Trac #64895).
- **[WordPress/gutenberg (PR #83845)](https://github.com/WordPress/gutenberg/pull/83845)** — 🟢 *Ready for Review:* Verify script localization data retention in `gutenberg_override_script()`.
- **[woocommerce/action-scheduler (PR #1378)](https://github.com/woocommerce/action-scheduler/pull/1378)** — 🟢 *Ready for Review:* Multi-timezone job queue hydration across UTC offsets.
- **[woocommerce/woocommerce-gateway-stripe (PR #6016)](https://github.com/woocommerce/woocommerce-gateway-stripe/pull/6016)** — 🟢 *Ready for Review:* ACH and Klarna payment token unit test suites.
- **[10up/ElasticPress (PR #4370)](https://github.com/10up/ElasticPress/pull/4370)** — ⏳ *In Review:* Elasticsearch 8.x indexing suites and template manager coverage.
- **[google/site-kit-wp (PR #13547)](https://github.com/google/site-kit-wp/pull/13547)** — ⏳ *In Review:* Analytics date range boundary matrices and leap year calculations.
- **[humanmade/S3-Uploads (PR #752)](https://github.com/humanmade/S3-Uploads/pull/752)** — ⏳ *In Review:* Presigned URL generation, ACL batching, and AWS S3 SDK v3 testing with MinIO.
- **[wpengine/faustjs (PR #2521)](https://github.com/wpengine/faustjs/pull/2521)** — 🟢 *Ready for Review:* Next.js 15+ server auth middleware, RFC 6265 token sanitization, and Cookies suites.
- **[xwp/stream (PR #2013)](https://github.com/xwp/stream/pull/2013)** — ⏳ *In Review:* Enterprise audit trail WooCommerce connector unit test suite.
- **[10up/distributor (PR #1402)](https://github.com/10up/distributor/pull/1402)** — 🟢 *Ready for Review:* Multi-site syndication integration tests for registered data handlers.
- **[WordPress/mcp-adapter (PR #335)](https://github.com/WordPress/mcp-adapter/pull/335)** — 🟢 *Ready for Review:* Console observability event serialization for Model Context Protocol.
- **[WordPress/php-ai-client (PR #297)](https://github.com/WordPress/php-ai-client/pull/297)** — 🟢 *Ready for Review:* HTTP error extraction subsystem for provider-agnostic PHP AI SDK.
- **[WordPress/ai-provider-for-openai (PR #53)](https://github.com/WordPress/ai-provider-for-openai/pull/53)** — 🟢 *Approved:* Model capability factory and exception handling.

---

## ⚡ High-Concurrency Distributed Edge Systems (Shopify + Cloudflare)

- **SyncOrders & EditOrders Architecture:**
  - **Edge-Native Performance:** Sub-25ms execution cycles using Cloudflare Workers, React Router v7, GraphQL, and distributed SQLite (D1).
  - **Distributed Reliability:** Engineered webhook deduplication (Idempotency), Fast-ACK asynchronous offloading (`ctx.waitUntil`), Circuit Breakers, Exponential Backoff with Jitter, and Dead Letter Queues (DLQ) for poison pill isolation.
  - **Clean Architecture & Verification:** Strict adherence to Dependency Inversion and Postel's Law backed by **600+ passing automated tests**.

---

## 🎙️ Community & Speaking Leadership

- 🎤 **WordCamp Sylhet 2026:** Official Panel Speaker (*"Contributor Showcase: Representing Bangladesh"*) & Contributor Day Themes Table Lead.
- 📘 **Author:** [WordPress Theme Contribution Guide](https://github.com/noruzzamans/wordpress-theme-contribution-guide) (Comprehensive 10-page guide on Block Themes, `theme.json`, and `WordPress/ipsum`).
- 🛠️ **WordCamp Rajshahi 2026:** Themes Table Lead (Contributor Day).
- 🏛️ **WPCampus Connect Bogura 2026:** Lead Organizer.
- 🤝 **WordCamp Dhaka 2025:** Official Event Volunteer.

---

## 🛠️ Technical Competencies

```
Languages & Core:     PHP 8.2–8.5 (OOP / SOLID), Modern JavaScript (ES6+), TypeScript, SQL
WordPress Ecosystem:  WordPress Core Internals, Gutenberg Block APIs, REST API, WP-CLI, Action Scheduler
Quality & Testing:    PHPUnit, PHPStan (Level 8), Jest, Vitest, Playwright, TDD, CI/CD GitHub Actions
Cloud & Edge:         Cloudflare Workers, Cloudflare D1 SQLite, Shopify Admin GraphQL API, AWS S3
```

---

## 📫 Let's Connect

- 💼 **LinkedIn:** [linkedin.com/in/noruzzaman](https://www.linkedin.com/in/noruzzaman/)
- 🌐 **WordPress.org:** [profiles.wordpress.org/noruzzaman](https://profiles.wordpress.org/noruzzaman/)
- 🐙 **GitHub:** [github.com/noruzzamans](https://github.com/noruzzamans)
- ✉️ **Email:** rubel.developer.bd@gmail.com
