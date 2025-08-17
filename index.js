import * as core from { '@actions/core'};
import * as github from { '@actions/github'};

async function addPRLabel() {
    try {
        const token = core.getInput('token')
        const label = 'needs-review';
        const octo = github.getOcoto(token)
        const issue_number = github.context.payload.pull_requsts.number
        const { owner, repo } = github.context.reop

        const res = await octo.rest.issues.addLabels({
            owner,
            repo,
            issue_number,
            lables: [label]
        })

        if (res.status == 200) {
            core.setOutput("result", "Label needs-review was added")
        } else
            throw new Error("Something went wrongn , status " + res.status + ", message " + res.body)
    } catch (err) {
        core.setFailed("Adding label failed: " + err.message ?? JSON.stringify(err))
    }

}

addPRLabel()