const fs = require('fs');
const path = require('path');

// Support both node-fetch and native fetch (Node 18+)
const fetch = typeof global.fetch === 'function' ? global.fetch : require('node-fetch');

// Paths to data sources (can be overridden by environment variables)
const CORE_STATS_PATH = process.env.CORE_STATS_PATH || path.join(__dirname, '../../wp-core-trac-contributions/stats.json');
const GUTENBERG_STATS_PATH = process.env.GUTENBERG_STATS_PATH || path.join(__dirname, '../../wp-gutenberg-contributions/stats.json');
const GUTENBERG_MERGED_PATH = process.env.GUTENBERG_MERGED_PATH || path.join(__dirname, '../../wp-gutenberg-contributions/my-prs/merged.md');
const README_PATH = process.env.README_PATH || path.join(__dirname, '../README.md');

// Plugins to track
const PLUGINS = [
    { slug: 'gslider-blocks', featured: true },
    { slug: 'current-date', name: 'Current Date Shortcode' },
    { slug: 'autocomplete-wc-order-status', name: 'Autocomplete Order Status' },
    { slug: 'copy-to-clipboard-for-wp', name: 'Copy to Clipboard' },
    { slug: 'quick-checkout-for-woocommerce', name: 'Quick Checkout for WC' },
    { slug: 'geomap-block', name: 'Geomap - Google Map Block' }
];

async function fetchPluginData(slug) {
    try {
        // Fetch primary data from 1.2 API
        const response12 = await fetch(`https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&request[slug]=${slug}`);
        if (!response12.ok) throw new Error(`HTTP 1.2 error! status: ${response12.status}`);
        const data12 = await response12.json();

        // Fetch download count from 1.0 API (since 1.2 lacks it)
        const response10 = await fetch(`https://api.wordpress.org/plugins/info/1.0/${slug}.json`);
        let downloaded = 0;
        if (response10.ok) {
            const data10 = await response10.json();
            downloaded = data10.downloaded || 0;
        }

        return {
            slug,
            active_installs: data12.active_installs,
            rating: data12.rating,
            downloaded: downloaded,
            num_ratings: data12.num_ratings
        };
    } catch (error) {
        console.error(`❌ Error fetching data for ${slug}:`, error.message);
        return null;
    }
}

function formatInstalls(count) {
    if (count >= 1000) {
        return `${Math.floor(count / 1000)},000+`;
    }
    return `${count}+`;
}

function formatRating(rating) {
    const stars = Math.round(rating / 20);
    return '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
}

// 1. Update Stats Section
async function updateStats(readmeContent) {
    console.log('📊 Fetching and updating WordPress stats...');
    let trac = { total: 0, props: 0, release_7_0: 0 };
    let guten = { total_involved: 0, with_props: 0, my_authored_merged: 0 };

    if (fs.existsSync(CORE_STATS_PATH)) {
        trac = JSON.parse(fs.readFileSync(CORE_STATS_PATH, 'utf8'));
    }
    if (fs.existsSync(GUTENBERG_STATS_PATH)) {
        const gData = JSON.parse(fs.readFileSync(GUTENBERG_STATS_PATH, 'utf8'));
        guten = { ...guten, ...gData };
    }

    const statsHtml = `
<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3 align="center">📋 WordPress Core Trac</h3>
      <p align="center">
        <a href="https://core.trac.wordpress.org/my-comments/all?USER=noruzzaman">
          <img src="https://img.shields.io/badge/Tickets_Participated-${trac.total}-21759B?style=flat-square" alt="Tickets" />
        </a>
        <a href="https://github.com/noruzzamans/wp-core-trac-contributions/blob/main/contributed/with-props.md">
          <img src="https://img.shields.io/badge/Props_Received-${trac.props}-success?style=flat-square" alt="Props" />
        </a>
      </p>
      <ul>
        <li>🧪 <b>Test Reports:</b> ${trac.total}</li>
        <li>🚀 <b>WP 7.0 Focus:</b> ${trac.release_7_0} tickets</li>
      </ul>
      <p align="center">
        <a href="https://github.com/noruzzamans/wp-core-trac-contributions">
          <img src="https://img.shields.io/badge/View_Details-→-21759B?style=for-the-badge" alt="View Details" />
        </a>
      </p>
    </td>
    <td width="50%" valign="top">
      <h3 align="center">🧱 WordPress Gutenberg</h3>
      <p align="center">
        <a href="https://github.com/WordPress/gutenberg/pulls?q=involves:noruzzamans">
          <img src="https://img.shields.io/badge/PRs_Involved-${guten.total_involved}-21759B?style=flat-square" alt="PRs Involved" />
        </a>
        <a href="https://github.com/noruzzamans/wp-gutenberg-contributions/blob/main/contributed/with-props.md">
          <img src="https://img.shields.io/badge/Props_Received-${guten.with_props}-success?style=flat-square" alt="Props" />
        </a>
      </p>
      <ul>
        <li>🛠️ <b>PRs Involved:</b> ${guten.total_involved}</li>
        <li>💬 <b>Code Reviews:</b> ${guten.total_involved - (guten.my_authored_merged || 0)}</li>
      </ul>
      <p align="center">
        <a href="https://github.com/noruzzamans/wp-gutenberg-contributions">
          <img src="https://img.shields.io/badge/View_Details-→-21759B?style=for-the-badge" alt="View Details" />
        </a>
      </p>
    </td>
  </tr>
</table>`;

    return updateSection(readmeContent, '<!-- STARTS_STATS -->', '<!-- END_STATS -->', statsHtml);
}

// 2. Update Highlights Section
function updateHighlights(readmeContent, totalMergedPRs, trac) {
    const highlightsHtml = `
<table>
  <tr>
    <td align="center" width="33%">
      <a href="https://github.com/search?q=org%3AWordPress+involves%3Anoruzzamans&type=pullrequests">
        <img src="https://img.shields.io/badge/${totalMergedPRs}+-Involvement-success?style=for-the-badge" alt="Involvement" />
      </a><br/>
      <sub><b>WordPress Org Repositories</b></sub>
    </td>
    <td align="center" width="33%">
      <a href="https://github.com/noruzzamans/wp-core-trac-contributions/blob/main/7.0-release/tickets.md">
        <img src="https://img.shields.io/badge/${trac.release_7_0}-WP_7.0_Tickets-blueviolet?style=for-the-badge" alt="WP 7.0" />
      </a><br/>
      <sub><b>Upcoming Release Focus</b></sub>
    </td>
    <td align="center" width="33%">
      <a href="https://github.com/WordPress/wordpress-playground/pulls?q=is%3Apr+author%3Anoruzzamans+is%3Amerged">
        <img src="https://img.shields.io/badge/Bengali-i18n_Translations-21759B?style=for-the-badge" alt="i18n" />
      </a><br/>
      <sub><b>WordPress Playground</b></sub>
    </td>
  </tr>
</table>`;

    return updateSection(readmeContent, '<!-- START_HIGHLIGHTS -->', '<!-- END_HIGHLIGHTS -->', highlightsHtml);
}

// 3. Update Merged PRs Table
async function updateMergedPRs(readmeContent) {
    console.log('📝 Fetching merged PRs from GitHub...');
    const githubToken = process.env.GITHUB_TOKEN;
    let mergedPRs = [];
    let totalCount = 0;

    if (githubToken) {
        try {
            const q = encodeURIComponent('is:pr author:noruzzamans org:WordPress is:merged');
            const response = await fetch(`https://api.github.com/search/issues?q=${q}&per_page=100`, {
                headers: { 'Authorization': `token ${githubToken}` }
            });
            const data = await response.json();
            totalCount = data.total_count;
            mergedPRs = data.items;
        } catch (error) {
            console.error('❌ Error fetching from GitHub API:', error.message);
        }
    }

    if (mergedPRs.length === 0 && fs.existsSync(GUTENBERG_MERGED_PATH)) {
        console.log('⚠️ Using local fallback for merged PRs...');
        // Fallback or additional logic if needed
    }

    const repos = {};
    mergedPRs.forEach(pr => {
        const repoUrl = pr.repository_url.replace('https://api.github.com/repos/', 'https://github.com/');
        const name = repoUrl.split('/').slice(-2).join('/');
        if (!repos[name]) repos[name] = { url: repoUrl + '/pulls?q=is%3Apr+author%3Anoruzzamans+is%3Amerged', count: 0, titles: [] };
        repos[name].count++;
        if (repos[name].titles.length < 3) {
            const cleanTitle = pr.title.replace(/\|/g, '\\|').replace(/[<>]/g, '');
            repos[name].titles.push(cleanTitle);
        }
    });

    let prTable = '| Repository | PRs | Recent Contributions |\n|------------|:---:|---------------|\n';
    Object.keys(repos).sort((a,b) => repos[b].count - repos[a].count).forEach(name => {
        const repo = repos[name];
        prTable += `| [${name}](${repo.url}) | ${repo.count} | ${repo.titles.join(', ')}... |\n`;
    });
    
    prTable += `\n<p align="center">\n  <a href="https://github.com/pulls?q=is%3Apr+author%3Anoruzzamans+org%3AWordPress+is%3Amerged">\n    <img src="https://img.shields.io/badge/View_All_Merged_PRs-→-21759B?style=for-the-badge" alt="View All PRs" />\n  </a>\n</p>`;

    return {
        content: updateSection(readmeContent, '<!-- START_MERGED_PRS -->', '<!-- END_MERGED_PRS -->', prTable),
        totalCount: totalCount
    };
}

// 4. Update Plugin Stats
async function updatePluginStats(readmeContent) {
    console.log('🔌 Fetching WordPress plugin stats...');
    let updatedContent = readmeContent;
    for (const plugin of PLUGINS) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = await fetchPluginData(plugin.slug);
        if (!data) continue;

        if (plugin.featured) {
            console.log(`⭐ Updating featured plugin: ${plugin.slug}`);
            updatedContent = updatedContent.replace(
                /(\*\*Active Installs:\*\* )([^\r\n]+)/,
                `$1${formatInstalls(data.active_installs)}`
            );
            updatedContent = updatedContent.replace(
                /(\*\*Rating:\*\* )([^\r\n]+)/,
                `$1${formatRating(data.rating)} (5/5)`
            );
            if (data.downloaded > 0) {
                updatedContent = updatedContent.replace(
                    /(\*\*Downloads:\*\* )([^\r\n]+)/,
                    `$1${data.downloaded.toLocaleString()}+`
                );
            }
        } else {
            console.log(`📦 Updating plugin in table: ${plugin.name}`);
            const escapedName = plugin.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const rowRegex = new RegExp(`(\\| \\[${escapedName}\\]\\(.*?\\) \\| )([^|]+)( \\| )([^|]+)( \\|)`);
            updatedContent = updatedContent.replace(
                rowRegex,
                `$1${formatInstalls(data.active_installs)}$3${formatRating(data.rating)}$5`
            );
        }
    }
    return updatedContent;
}

function updateSection(readme, start, end, content) {
    const startIndex = readme.indexOf(start);
    const endIndex = readme.indexOf(end);
    if (startIndex !== -1 && endIndex !== -1) {
        return readme.substring(0, startIndex + start.length) + '\n' + content + '\n' + readme.substring(endIndex);
    }
    return readme;
}

async function updateReadme() {
    console.log('🚀 Starting profile README sync...');

    if (!fs.existsSync(README_PATH)) {
        console.error('❌ README.md not found!');
        return;
    }

    let readmeContent = fs.readFileSync(README_PATH, 'utf8');
    const oldReadme = readmeContent;

    // Run updates
    readmeContent = await updateStats(readmeContent);
    const prResult = await updateMergedPRs(readmeContent);
    readmeContent = prResult.content;
    
    // Get trac again for highlights
    let trac = { release_7_0: 0 };
    if (fs.existsSync(CORE_STATS_PATH)) {
        trac = JSON.parse(fs.readFileSync(CORE_STATS_PATH, 'utf8'));
    }
    readmeContent = updateHighlights(readmeContent, prResult.totalCount, trac);
    
    readmeContent = await updatePluginStats(readmeContent);

    if (oldReadme !== readmeContent) {
        fs.writeFileSync(README_PATH, readmeContent);
        console.log('✅ Profile README updated successfully!');
    } else {
        console.log('⏭️ No changes detected in the README. Skipping write.');
    }
}

updateReadme();
