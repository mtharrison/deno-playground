const Fs = require('fs');
const Https = require('https');

Https.get('https://github.com/denoland/deno/releases', (res) => {

    let page = '';
    const versions = [];

    res.on('data', (d) => page += d);
    res.on('end', () => {

        const re = /\/denoland\/deno\/releases\/download\/(.*)\/deno_linux_x64\.gz/g;

        const paths = page.match(re);

        const groupRe = new RegExp(re.source);

        for (const path of paths) {
            const matches = path.match(groupRe);
            versions.push(matches[1]);
        }

        // Write out versions YAML

        const yaml = `deno_versions:\n  - ${versions.join('\n  - ')}`

        Fs.writeFileSync('helm/values-versions.yaml', yaml);
        Fs.writeFileSync('application/sandbox/versions.txt', versions.join(' '));
    });
});

