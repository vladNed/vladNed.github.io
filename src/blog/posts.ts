export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'seconds-until-midnight',
    title: 'Calculating the number of seconds until midnight',
    date: '2020-01-20',
    summary:
      'A fun quick problem — how to find the number of seconds until midnight in Python, the elegant way.',
    content: `
# DevLog #1: Calculating the number of seconds until midnight

## Disclaimer

This is an old article that I once wrote on DEV.to and since I want to start my own blog I'll review it and add it to my new blog.

## Introduction

I know this might be very straight forward for some developers but I found this a pretty intriguing and fun quick problem to solve, it also might help some beginners furthermore. How can you find the number of seconds until midnight?....with python...in an elegant way.

## Code

My first approach to this was to subtract from the 24 hours the number of hours that passed today, and so multiply with 60 to get the number of seconds.

\`\`\`python
from datetime import datetime

seconds_until_midnight = (24 - datetime.now().hour) * 60 * 60
\`\`\`

The pros of this formula is that is fast, but it lack the readability of python coding. By using datetime package from python you can increase the readability and the code follows as this:

\`\`\`python
from datetime import datetime, timedelta, time

now = datetime.now()
midnight = datetime.combine(now + timedelta(days=1), time())

seconds_until_midnight = (midnight - now).seconds
\`\`\`

\`midnight\` is calculated by combining tomorrow date with time, which will strip the time to 00:00. \`seconds_until_midnight\` subtracts from midnight datetime the \`now\` datetime to get the time-frame between these two.

You can also add all this to a method:

\`\`\`python
from datetime import datetime, timedelta, time

def seconds_until_midnight() -> int:
    """Calculate seconds until midnight"""
    now = datetime.now()
    midnight = datetime.combine(now + timedelta(days=1), time())

    return (midnight - now).seconds
\`\`\`
`,
  },
  {
    slug: 'hello-world',
    title: 'Hello, World!',
    date: '2026-03-13',
    summary:
      'First post on this blog. A quick intro on who I am, what I build, and what to expect here.',
    content: `
# Hello, World!

Welcome to my corner of the internet.

I'm **vladNed** — a software engineer who likes building things that are simple, fast, and useful. If you've stumbled onto this page, you're probably looking at my GitHub profile site, which itself is a little terminal-themed experiment I put together.

## What I've been working on

A couple of projects I've launched recently:

- **[fastapi-endpoints](https://vladned.github.io/fastapi-endpoints/)** — A file-based router for FastAPI. Drop your route files into a directory structure and it wires everything up automatically. Less boilerplate, more building.

## Why a blog?

Mostly to document things I learn along the way — debugging rabbit holes, architectural decisions, tools I find useful. The kind of stuff that's too long for a commit message but too short for a talk.

## What's next

I'll be writing about backend systems, developer tooling, and whatever else catches my attention. No schedule, no pressure — just notes from the terminal.

\`\`\`
$ echo "zen like a bonsai"
zen like a bonsai
\`\`\`

Thanks for reading. More posts coming soon.
`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
