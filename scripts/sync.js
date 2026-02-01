const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Paths to data sources
const CORE_STATS_PATH = path.join(__dirname, '../../wp-core-trac-contributions/stats.json');
const GUTENBERG_STATS_PATH = path.join(__dirname, '../../wp-gutenberg-contributions/stats.json');
const GUTENBERG_MERGED_PATH = path.join(__dirname, '../../wp-gutenberg-contributions/my-prs/merged.md');
const README_PATH = path.join(__dirname, '../README.md');

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
        const response = await fetch(`https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&request[slug]=${slug}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return {
            slug,
            active_installs: data.active_installs,
            rating: data.rating,
            downloaded: data.downloaded,
            num_ratings: data.num_ratings
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

async function updateReadme() {
    console.log('🚀 Starting profile README sync...');

    if (!fs.existsSync(README_PATH)) {
        console.error('❌ README.md not found!');
        return;
    }

    let readmeContent = fs.readFileSync(README_PATH, 'utf8');

    // 1. Update Core Trac Stats
    // ... existing Core Trac update logic ...
    if (fs.existsSync(CORE_STATS_PATH)) {
        const coreStats = JSON.parse(fs.readFileSync(CORE_STATS_PATH, 'utf8'));
        console.log('📊 Updating Core Trac stats...');

        // Find the Trac section
        const tracSectionMatch = readmeContent.match(/📋 WordPress Core Trac[\s\S]*?<\/td>/);
        if (tracSectionMatch) {
            let tracSection = tracSectionMatch[0];
            
            // Update Tickets Participated
            tracSection = tracSection.replace(
                /(Tickets_Participated-)(\d+)(-21759B)/,
                `$1${coreStats.total}$3`
            );
            // Update Props Received (Core)
            tracSection = tracSection.replace(
                /(Props_Received-)(\d+)(-success\?style=flat-square" alt="Props" \/>)/,
                `$1${coreStats.props}$3`
            );
            // Update Test Reports
            tracSection = tracSection.replace(
                /(<li>🧪 <b>Test Reports:<\/b> )(\d+)(<\/li>)/,
                `$1${coreStats.test_reports}$3`
            );
            // Update Milestone Focus
            tracSection = tracSection.replace(
                /(<li>🚀 <b>WP 7.0 Focus:<\/b> )(\d+)( tickets<\/li>)/,
                `$1${coreStats.release_7_0}$3`
            );

            readmeContent = readmeContent.replace(tracSectionMatch[0], tracSection);
        }

        // Update WP 7.0 Tickets Badge in Highlights section
        readmeContent = readmeContent.replace(
            /(img.shields.io\/badge\/)(\d+)(-WP_7.0_Tickets-blueviolet)/,
            `$1${coreStats.release_7_0}$3`
        );
    }

    // 2. Update Gutenberg Stats
    if (fs.existsSync(GUTENBERG_STATS_PATH)) {
        const gStats = JSON.parse(fs.readFileSync(GUTENBERG_STATS_PATH, 'utf8'));
        console.log('📊 Updating Gutenberg stats...');

        // Find the Gutenberg section
        const gutenbergSectionMatch = readmeContent.match(/🧱 WordPress Gutenberg[\s\S]*?<\/td>/);
        if (gutenbergSectionMatch) {
            let gSection = gutenbergSectionMatch[0];

            // Update PRs Involved
            gSection = gSection.replace(
                /(PRs_Involved-)(\d+)(-21759B)/,
                `$1${gStats.total_involved}$3`
            );
            // Update Props Received (Gutenberg)
            gSection = gSection.replace(
                /(Props_Received-)(\d+)(-success\?style=flat-square" alt="Props" \/>)/,
                `$1${gStats.with_props}$3`
            );
            // Update PRs Involved List
            gSection = gSection.replace(
                /(<li>🛠️ <b>PRs Involved:<\/b> )(\d+)(<\/li>)/,
                `$1${gStats.total_involved}$3`
            );

            readmeContent = readmeContent.replace(gutenbergSectionMatch[0], gSection);
        }
    }

    // 3. Update Merged PRs Table
    if (fs.existsSync(GUTENBERG_MERGED_PATH)) {
        console.log('📝 Updating Merged PRs table...');
        const mergedContent = fs.readFileSync(GUTENBERG_MERGED_PATH, 'utf8');
        const prMatches = mergedContent.match(/- ✅ \[#(\d+)\]\((.*?)\) - (.*)/g);
        
        if (prMatches) {
            // Check if Gutenberg entry already exists in the table
            if (!readmeContent.includes('WordPress/gutenberg')) {
                const prList = prMatches.slice(0, 3).map(line => {
                    const m = line.match(/- ✅ \[#(\d+)\]\((.*?)\) - (.*)/);
                    return m ? `${m[3]} #${m[1]}` : '';
                }).filter(Boolean).join(', ') + '...';

                const newRow = `| [WordPress/gutenberg](https://github.com/WordPress/gutenberg/pulls?q=is%3Apr+author%3Anoruzzamans+is%3Amerged) | ${prMatches.length} | ${prList} |\n`;
                
                // Insert before the first repository in the table
                readmeContent = readmeContent.replace(
                    /(\| Repository \| PRs \| Recent Contributions \|[\r\n]|---[\r\n])/,
                    `$1${newRow}`
                );
            } else {
                // Update existing Gutenberg row
                const prList = prMatches.slice(0, 2).map(line => {
                    const m = line.match(/- ✅ \[#(\d+)\]\((.*?)\) - (.*)/);
                    return m ? `${m[3]} #${m[1]}` : '';
                }).filter(Boolean).join(', ') + '...';

                readmeContent = readmeContent.replace(
                    /(\| \[WordPress\/gutenberg\].*? \| )(\d+)( \| ).*?( \|)/,
                    `$1${prMatches.length}$3${prList}$4`
                );
            }
        }
    }

    // 4. Update Plugin Stats from WordPress.org API
    console.log('🔌 Fetching and updating WordPress plugin stats...');
    for (const plugin of PLUGINS) {
        const data = await fetchPluginData(plugin.slug);
        if (!data) continue;

        if (plugin.featured) {
            console.log(`⭐ Updating featured plugin: ${plugin.slug}`);
            // Use anchors for safer line-by-line replacement
            readmeContent = readmeContent.replace(
                /(\*\*Active Installs:\*\* )([^\r\n]+)/,
                `$1${formatInstalls(data.active_installs)}`
            );
            readmeContent = readmeContent.replace(
                /(\*\*Rating:\*\* )([^\r\n]+)/,
                `$1${formatRating(data.rating)} (5/5)`
            );
            
            // Only update downloads if we got a non-zero value
            if (data.downloaded > 0) {
                readmeContent = readmeContent.replace(
                    /(\*\*Downloads:\*\* )([^\r\n]+)/,
                    `$1${data.downloaded.toLocaleString()}+`
                );
            }
        } else {
            console.log(`📦 Updating plugin in table: ${plugin.name}`);
            // Update table row: | [Name](URL) | Installs | Rating |
            const escapedName = plugin.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const rowRegex = new RegExp(`(\\| \\[${escapedName}\\]\\(.*?\\) \\| )([^|]+)( \\| )([^|]+)( \\|)`);
            readmeContent = readmeContent.replace(
                rowRegex,
                `$1${formatInstalls(data.active_installs)}$3${formatRating(data.rating)}$5`
            );
        }
    }

    fs.writeFileSync(README_PATH, readmeContent);
    console.log('✅ Profile README updated successfully!');
}

updateReadme();
