import type { Locator } from '@playwright/test';
import { test, expect } from './fixtures';
import type { HomePage } from './pages/HomePage';
import { viewports } from './config/testData';

// T5.4: press, lift, sheen, nav underline and the WhatsApp pulse.
// Every check reads computed style (the element or its ::before / ::after) or
// animation timing, never a class name. Pointer checks use a real mouse.

interface Target {
  name: string;
  locate: (home: HomePage) => Locator;
}

// Everything that shrinks when pressed, per screen size (the nav is desktop
// only, the menu toggle and hero button are phone only)
const desktopPressTargets: Target[] = [
  { name: 'header call button', locate: (home) => home.headerCallLink },
  { name: 'service card', locate: (home) => home.firstServiceLink },
  { name: 'footer social icon', locate: (home) => home.footerSocialLink },
  { name: 'WhatsApp widget', locate: (home) => home.whatsAppWidget },
];

const phonePressTargets: Target[] = [
  { name: 'menu toggle', locate: (home) => home.menuToggleButton },
  { name: 'hero call button', locate: (home) => home.heroCallLink },
  { name: 'service card', locate: (home) => home.firstServiceLink },
  { name: 'WhatsApp widget', locate: (home) => home.whatsAppWidget },
];

// Nav items that draw an underline from their own hover
const underlineTargets: Target[] = [
  { name: 'About link', locate: (home) => home.navAboutLink },
  { name: 'Services button', locate: (home) => home.navServicesButton },
];

// One test per target: hold the mouse down and read what :active does
function definePressTests(targets: Target[]) {
  for (const { name, locate } of targets) {
    test(`${name} shrinks while pressed`, async ({
      homePage,
      interactionAudit,
    }) => {
      // Arrange
      const target = locate(homePage);
      const pressed = await interactionAudit.token('--press-scale');

      // Act - :active applies while the mouse is down, and nothing is clicked
      await interactionAudit.hold(target);

      // Assert
      await expect.poll(() => interactionAudit.scaleX(target)).toBe(pressed);
      expect(await interactionAudit.style(target, 'touch-action')).toBe(
        'manipulation',
      );
    });
  }
}

test.describe('Press, desktop', { tag: '@interaction' }, () => {
  test.use({ viewport: viewports.desktop });

  definePressTests(desktopPressTargets);
});

test.describe('Press, phone', { tag: '@interaction' }, () => {
  test.use({ viewport: viewports.mobile });

  definePressTests(phonePressTargets);

  test('menu toggle shows a pointer cursor', async ({
    homePage,
    interactionAudit,
  }) => {
    // Assert
    expect(
      await interactionAudit.style(homePage.menuToggleButton, 'cursor'),
    ).toBe('pointer');
  });
});

test.describe('Lift and sheen, desktop', { tag: '@interaction' }, () => {
  test.use({ viewport: viewports.desktop });

  test('a hovered service card rises', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange
    const card = homePage.firstServiceLink;
    const rise = await interactionAudit.liftDistance();
    expect(await interactionAudit.translateY(card)).toBe(0);

    // Act
    await card.hover();

    // Assert
    await expect.poll(() => interactionAudit.translateY(card)).toBe(-rise);
  });

  test('a hovered Why Choose Us card rises', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange - the card is not a link, so it has lift but no press
    const card = homePage.whyChooseUsCards.first();
    const rise = await interactionAudit.liftDistance();
    expect(await interactionAudit.translateY(card)).toBe(0);

    // Act
    await card.hover();

    // Assert
    await expect.poll(() => interactionAudit.translateY(card)).toBe(-rise);
  });

  test('hovering a Why Choose Us card changes no layout', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange - where every card sits and how big it is, before the hover
    const before = await interactionAudit.layoutBoxes(
      homePage.whyChooseUsCards,
    );

    // Act
    await homePage.whyChooseUsCards.first().hover();
    await interactionAudit.settleFrames();

    // Assert - the old strip grew one card and shrank the other three
    expect(
      await interactionAudit.layoutBoxes(homePage.whyChooseUsCards),
    ).toEqual(before);
  });

  test('a primary button sweeps a sheen across once on hover', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange - the sweep rides on ::after, resting off to one side
    const button = homePage.headerCallLink;
    expect(await interactionAudit.hasPseudo(button, '::after')).toBe(true);
    const resting = await interactionAudit.style(
      button,
      'translate',
      '::after',
    );

    // Act
    await button.hover();

    // Assert
    await expect
      .poll(() => interactionAudit.style(button, 'translate', '::after'))
      .not.toBe(resting);
  });

  test('a secondary button has no sheen', async ({
    homePage,
    interactionAudit,
  }) => {
    // Assert - the About snippet button is a secondary LinkButton
    expect(
      await interactionAudit.hasPseudo(homePage.aboutCtaLink, '::after'),
    ).toBe(false);
  });

  test('a service card shows a focus ring for keyboard users', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange
    const card = homePage.firstServiceLink;
    expect(await interactionAudit.style(card, 'box-shadow')).toBe('none');

    // Act
    await interactionAudit.focusByKeyboard(card);

    // Assert
    expect(await interactionAudit.isFocusVisible(card)).toBe(true);
    await expect
      .poll(() => interactionAudit.style(card, 'box-shadow'))
      .not.toBe('none');
  });
});

test.describe('Nav underline', { tag: '@interaction' }, () => {
  test.use({ viewport: viewports.desktop });

  for (const { name, locate } of underlineTargets) {
    test(`${name} draws an underline on hover`, async ({
      homePage,
      interactionAudit,
    }) => {
      // Arrange - drawn on ::after, fully scaled away at rest
      const target = locate(homePage);
      expect(await interactionAudit.scaleX(target, '::after')).toBe(0);

      // Act
      await target.hover();

      // Assert
      await expect
        .poll(() => interactionAudit.scaleX(target, '::after'))
        .toBe(1);
    });
  }

  test('About link draws its underline on keyboard focus', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange
    const about = homePage.navAboutLink;
    expect(await interactionAudit.scaleX(about, '::after')).toBe(0);

    // Act
    await interactionAudit.focusByKeyboard(about);

    // Assert
    expect(await interactionAudit.isFocusVisible(about)).toBe(true);
    await expect.poll(() => interactionAudit.scaleX(about, '::after')).toBe(1);
  });

  test('a dropdown row draws an underline under its title', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange - open the dropdown, the title is the first span in the row
    await homePage.navServicesButton.hover();
    const title = homePage.navDropdownLink.locator('span').first();
    expect(await interactionAudit.scaleX(title, '::after')).toBe(0);

    // Act
    await homePage.navDropdownLink.hover();

    // Assert
    await expect.poll(() => interactionAudit.scaleX(title, '::after')).toBe(1);
  });

  test('Services keeps its underline while the pointer is in the dropdown', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange
    const services = homePage.navServicesButton;
    expect(await interactionAudit.hasPseudo(services, '::after')).toBe(true);

    // Act - the pointer leaves the button for a row in its dropdown
    await services.hover();
    await homePage.navDropdownLink.hover();

    // Assert
    await expect
      .poll(() => interactionAudit.scaleX(services, '::after'))
      .toBe(1);
  });

  test('Services button shows a pointer cursor', async ({
    homePage,
    interactionAudit,
  }) => {
    // Assert
    expect(
      await interactionAudit.style(homePage.navServicesButton, 'cursor'),
    ).toBe('pointer');
  });
});

test.describe('Touch devices', { tag: '@interaction' }, () => {
  test.use({ viewport: viewports.mobile, hasTouch: true, isMobile: true });

  test('hover effects stay off when the device cannot hover', async ({
    homePage,
    interactionAudit,
    motionAudit,
  }) => {
    // Arrange - the hover media query must be false, or this proves nothing
    expect(await interactionAudit.canHover()).toBe(false);
    const button = homePage.heroCallLink;
    // The button sweeps once on load (T5.5). Wait for that to end, or "resting"
    // would be a position part-way through the sweep
    await expect.poll(() => motionAudit.sheenAnimationCount()).toBe(0);
    expect(await interactionAudit.hasPseudo(button, '::after')).toBe(true);
    const resting = await interactionAudit.style(
      button,
      'translate',
      '::after',
    );

    // Act - a touch browser still reports :hover after a tap
    await homePage.firstServiceLink.hover();
    await interactionAudit.settleFrames();

    // Assert - the card has not risen
    expect
      .soft(await interactionAudit.translateY(homePage.firstServiceLink))
      .toBe(0);

    // Act
    await button.hover();
    await interactionAudit.settleFrames();

    // Assert - the sheen has not moved
    expect
      .soft(await interactionAudit.style(button, 'translate', '::after'))
      .toBe(resting);
  });
});

test.describe('WhatsApp pulse', { tag: '@interaction' }, () => {
  test.use({ viewport: viewports.mobile });

  test('pulses twice after a delay and does not hold its end state', async ({
    homePage,
    interactionAudit,
  }) => {
    // Act
    await expect
      .poll(
        async () =>
          (await interactionAudit.pulseTimings(homePage.whatsAppWidget)).length,
      )
      .toBe(1);
    const [pulse] = await interactionAudit.pulseTimings(
      homePage.whatsAppWidget,
    );

    // Assert - soft, so all three report even if one fails
    expect.soft(pulse.iterations).toBe(2);
    expect.soft(pulse.delay).toBeGreaterThan(0);
    expect.soft(['none', 'auto', 'backwards']).toContain(pulse.fill);
  });

  test('is still and fully shown once it has played out', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange - the animation must exist, or finishing it proves nothing
    const widget = homePage.whatsAppWidget;
    await expect
      .poll(async () => (await interactionAudit.pulseTimings(widget)).length)
      .toBe(1);

    // Act
    await interactionAudit.finishPulse(widget);

    // Assert - the ring is gone, the widget itself is untouched
    expect
      .soft(await interactionAudit.style(widget, 'opacity', '::before'))
      .toBe('0');
    expect.soft(await interactionAudit.style(widget, 'opacity')).toBe('1');
    expect.soft(await interactionAudit.style(widget, 'scale')).toBe('none');
  });

  test('does not scroll the page sideways at its widest', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange
    const widget = homePage.whatsAppWidget;
    await expect
      .poll(async () => (await interactionAudit.pulseTimings(widget)).length)
      .toBe(1);

    // Act
    await interactionAudit.freezePulseNearEnd(widget);

    // Assert
    expect(await interactionAudit.horizontalOverflow()).toBe(0);
  });
});

test.describe('Reduced motion', { tag: '@interaction' }, () => {
  test.use({
    viewport: viewports.desktop,
    contextOptions: { reducedMotion: 'reduce' },
  });

  test('pressing does not shrink anything', async ({
    homePage,
    interactionAudit,
  }) => {
    // Act
    await interactionAudit.hold(homePage.headerCallLink);
    await interactionAudit.settleFrames();

    // Assert
    expect(await interactionAudit.style(homePage.headerCallLink, 'scale')).toBe(
      'none',
    );
  });

  test('the nav underline appears at once, with no draw', async ({
    homePage,
    interactionAudit,
  }) => {
    // Arrange
    const about = homePage.navAboutLink;
    expect(await interactionAudit.scaleX(about, '::after')).toBe(0);

    // Act
    await about.hover();

    // Assert - shown, and nothing animates it
    await expect.poll(() => interactionAudit.scaleX(about, '::after')).toBe(1);
    expect(
      await interactionAudit.style(about, 'transition-duration', '::after'),
    ).toBe('0s');
  });

  test('the WhatsApp widget does not pulse', async ({
    homePage,
    interactionAudit,
  }) => {
    // Assert
    expect(
      await interactionAudit.pulseTimings(homePage.whatsAppWidget),
    ).toHaveLength(0);
  });
});
