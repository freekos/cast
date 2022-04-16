/* eslint-disable camelcase */
import type { SBPodcast } from '$lib/shared/api/adapters';

const writablePodcastFields: Partial<SBPodcast> = {
  title: 'a new title',
  author: 'an author',
};

describe('For anonymous users', () => {
  it('permits reading', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const response = await supabase.from<SBPodcast>('podcasts').select('*').limit(1).single();
      expect(response.status).to.be.gte(200).and.be.lessThan(300);
    });
  });

  it('forbids creating', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const response = await supabase.from<SBPodcast>('podcasts').insert(writablePodcastFields);
      expect(response.status).to.be.gte(400).and.be.lessThan(500);
    });
  });

  it('forbids updating', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { data: existingRow } = await supabase
        .from<SBPodcast>('podcasts')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBPodcast>('podcasts')
          .update(writablePodcastFields)
          .eq('id', existingRow.id);
        expect(response.status).to.be.gte(400).and.be.lessThan(500);
      }
    });
  });

  it('forbids deleting', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { data: existingRow } = await supabase
        .from<SBPodcast>('podcasts')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBPodcast>('podcasts')
          .delete({ count: 'exact' })
          .eq('id', existingRow.id);
        expect(response.count).to.be.eq(0);
      }
    });
  });
});

describe('For authorized users', () => {
  it('permits reading', () => {
    cy.login().then(async ([, supabase]) => {
      const response = await supabase.from<SBPodcast>('podcasts').select('*').limit(1).single();
      expect(response.status).to.be.gte(200).and.be.lessThan(300);
    });
  });

  it('forbids creating', () => {
    cy.login().then(async ([, supabase]) => {
      const response = await supabase.from<SBPodcast>('podcasts').insert(writablePodcastFields);
      expect(response.status).to.be.gte(400).and.be.lessThan(500);
    });
  });

  it('forbids updating', () => {
    cy.login().then(async ([, supabase]) => {
      const { data: existingRow } = await supabase
        .from<SBPodcast>('podcasts')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBPodcast>('podcasts')
          .update(writablePodcastFields)
          .eq('id', existingRow.id);
        expect(response.status).to.be.gte(400).and.be.lessThan(500);
      }
    });
  });

  it('forbids deleting', () => {
    cy.login().then(async ([, supabase]) => {
      const { data: existingRow } = await supabase
        .from<SBPodcast>('podcasts')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBPodcast>('podcasts')
          .delete({ count: 'exact' })
          .eq('id', existingRow.id);
        expect(response.count).to.be.eq(0);
      }
    });
  });
});
