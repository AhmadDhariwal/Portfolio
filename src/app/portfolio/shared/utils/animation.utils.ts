import { ElementRef } from '@angular/core';

let gsapRegistered = false;

export async function runPortfolioAnimations(host: ElementRef<HTMLElement>): Promise<void> {
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const gsapModule = await import('gsap');
  const scrollTriggerModule = await import('gsap/ScrollTrigger');
  const gsap = gsapModule.gsap;
  const { ScrollTrigger } = scrollTriggerModule;

  if (!gsapRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    gsapRegistered = true;
  }

  const root = host.nativeElement;
  const ease = 'expo.out';

  gsap.from(root.querySelectorAll('.hero-reveal'), {
    y: 40,
    opacity: 0,
    duration: 0.85,
    stagger: 0.12,
    ease
  });

  gsap.from(root.querySelector('.hero-scene-wrap'), {
    opacity: 0,
    scale: 0.9,
    y: 24,
    duration: 0.9,
    delay: 0.3,
    ease
  });

  gsap.utils.toArray<HTMLElement>('.pf-section-header').forEach((target) => {
    gsap.from(target, {
      scrollTrigger: {
        trigger: target,
        start: 'top 84%'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease
    });
  });

  const aboutGrid = root.querySelector('.about-grid');
  if (aboutGrid) {
    const aboutTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: aboutGrid,
        start: 'top 82%'
      }
    });

    aboutTimeline
      .from(root.querySelector('.profile-card'), {
        x: -72,
        y: 18,
        rotateY: -12,
        opacity: 0,
        duration: 0.9,
        ease
      })
      .from(
        root.querySelectorAll('.about-copy-line'),
        {
          y: 34,
          opacity: 0,
          duration: 0.74,
          stagger: 0.1,
          ease
        },
        '-=0.58'
      )
      .from(
        root.querySelectorAll('.info-row'),
        {
          x: -22,
          opacity: 0,
          duration: 0.62,
          stagger: 0.08,
          ease
        },
        '-=0.42'
      )
      .from(
        root.querySelectorAll('.about-aside .compact-card'),
        {
          x: 58,
          y: 18,
          opacity: 0,
          duration: 0.78,
          stagger: 0.14,
          ease
        },
        '-=0.68'
      )
      .from(
        root.querySelectorAll('.mini-icons img'),
        {
          scale: 0.5,
          rotate: -12,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease
        },
        '-=0.3'
      );
  }

  const staggerGroups = [
    { selector: '.stats-shell .stat-item', stagger: 0.12, y: 42, scale: 1 },
    { selector: '.project-stage', stagger: 0.12, y: 42, scale: 0.985 },
    { selector: '.skills-grid .skill-orb', stagger: 0.1, y: 30, scale: 0.92 },
    { selector: '.contact-grid > *', stagger: 0.15, y: 48, scale: 1 }
  ];

  for (const group of staggerGroups) {
    const targets = root.querySelectorAll(group.selector);
    if (!targets.length) {
      continue;
    }

    gsap.from(targets, {
      scrollTrigger: {
        trigger: targets[0],
        start: 'top 84%'
      },
      y: group.y,
      scale: group.scale,
      opacity: 0,
      duration: 0.82,
      stagger: group.stagger,
      ease
    });
  }

  gsap.utils.toArray<HTMLElement>('.timeline-card').forEach((target, index) => {
    gsap.from(target, {
        scrollTrigger: {
          trigger: target,
          start: 'top 84%'
        },
        x: index % 2 === 0 ? -48 : 48,
        y: 18,
        opacity: 0,
        duration: 0.82,
        ease
      });
  });
}
