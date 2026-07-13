import { expect, test } from '@playwright/test';

// Source of truth: the CV. Reverse-chronological, Storyline first.
const roles = [
  {
    company: 'Storyline',
    title: 'Senior Full Stack Developer',
    period: 'Jul 2025 – Present',
  },
  {
    company: 'Cloud Employee, Data Lighthouse (akeno.ai)',
    title: 'Senior Full Stack Developer',
    period: 'Sep 2021 – Sep 2025',
  },
  {
    company: 'Accenture',
    title: 'Application Development Team Lead',
    period: 'Feb 2021 – Sep 2021',
  },
  {
    company: 'Outliant',
    title: 'React Native Developer',
    period: 'Jun 2020 – Feb 2021',
  },
  {
    company: '4Loop',
    title: 'R&D Engineer / Senior Software Engineer',
    period: 'Sep 2019 – Jun 2020',
  },
  {
    company: 'Four13',
    title: 'Full Stack Developer',
    period: 'Jan 2019 – Jan 2020',
  },
  {
    company: 'DXC Technologies, Emirates Group',
    title: 'Professional Program Analyst (Software Engineer)',
    period: 'Nov 2014 – Sep 2018',
  },
];

test.describe('career timeline', () => {
  test('all seven roles render with company, title, and dates in order', async ({
    page,
  }) => {
    await page.goto('/#career');
    const entries = page.locator('#career li');

    await expect(entries).toHaveCount(roles.length);
    for (const [i, role] of roles.entries()) {
      const entry = entries.nth(i);
      await expect(entry).toContainText(role.company);
      await expect(entry).toContainText(role.title);
      await expect(entry).toContainText(role.period);
    }
  });

  test('scrolling through the timeline reveals every entry', async ({
    page,
  }) => {
    await page.goto('/#career');
    const lastEntry = page.locator('#career li').last();

    await lastEntry.scrollIntoViewIfNeeded();
    // Entries fade/stagger in on scroll; the last one must finish at full
    // opacity. Probe the entry node itself — opacity isn't inherited.
    await expect
      .poll(async () =>
        lastEntry.evaluate((el) => getComputedStyle(el).opacity),
      )
      .toBe('1');
  });

  test('reduced motion shows the complete static timeline', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#career');
    const entries = page.locator('#career li');

    await expect(entries).toHaveCount(roles.length);
    for (let i = 0; i < roles.length; i++) {
      const opacity = await entries
        .nth(i)
        .evaluate((el) => getComputedStyle(el).opacity);
      expect(opacity).toBe('1');
    }
  });
});
