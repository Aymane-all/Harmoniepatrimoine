-- ============================================================
-- BASE DE DONNÉES SITE CALL CENTER - VERSION 3.1
-- Adapté pour Supabase (PostgreSQL)
-- Auteur : Manal, Aymane, Simo
-- ============================================================
-- INSTRUCTIONS :
-- 1. Ouvrir Supabase → SQL Editor → New query
-- 2. Copier-coller TOUT ce fichier
-- 3. Cliquer sur "Run" (ou Ctrl+Enter)
-- 4. Choisir "Run and enable RLS"
-- 5. Vérifier dans "Table Editor" que les 5 tables sont créées
-- ============================================================


-- ============================================================
-- ÉTAPE 1 : CRÉATION DES TYPES PERSONNALISÉS (ENUM)
-- ============================================================

-- Type pour le statut d'un lead (pipeline call center)
DO $$ BEGIN
    CREATE TYPE statut_lead AS ENUM (
        'nouveau',
        'a_rappeler',
        'contacte',
        'converti',
        'perdu'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Type pour le type de logement
DO $$ BEGIN
    CREATE TYPE type_logement_enum AS ENUM (
        'maison',
        'appartement',
        'autre'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


-- ============================================================
-- ÉTAPE 2 : TABLE SERVICES (la table mère)
-- ============================================================

CREATE TABLE IF NOT EXISTS services (
    id_service       BIGSERIAL PRIMARY KEY,
    nom_service      VARCHAR(100) NOT NULL,
    description      TEXT,
    icone            VARCHAR(100),
    slug             VARCHAR(100) NOT NULL UNIQUE,
    actif            BOOLEAN DEFAULT TRUE,
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE services IS 'Catalogue des 4 prestations proposees';
COMMENT ON COLUMN services.icone IS 'Nom Font Awesome (ex: fa-fire)';
COMMENT ON COLUMN services.slug IS 'Version URL du nom (ex: chauffage)';


-- ============================================================
-- ÉTAPE 3 : TABLE KEYWORDS (mots-cles SEO)
-- ============================================================

CREATE TABLE IF NOT EXISTS keywords (
    id_keyword          BIGSERIAL PRIMARY KEY,
    id_service          BIGINT NOT NULL,
    mot_cle             VARCHAR(200) NOT NULL UNIQUE,
    slug_url            VARCHAR(200) NOT NULL UNIQUE,
    region              VARCHAR(100),
    volume_recherche    INTEGER,
    cpc_estime          DECIMAL(6,2),
    position_google     INTEGER,
    actif               BOOLEAN DEFAULT TRUE,
    created_at          TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_keywords_service
        FOREIGN KEY (id_service)
        REFERENCES services(id_service)
        ON DELETE RESTRICT
);

COMMENT ON TABLE keywords IS '160 mots-cles SEO cibles par le site';
COMMENT ON COLUMN keywords.volume_recherche IS 'Recherches mensuelles sur Google';
COMMENT ON COLUMN keywords.cpc_estime IS 'Cout par clic en euros';


-- ============================================================
-- ÉTAPE 4 : TABLE SIMULATEURS (4 calculateurs)
-- ============================================================

CREATE TABLE IF NOT EXISTS simulateurs (
    id_simulateur     BIGSERIAL PRIMARY KEY,
    id_service        BIGINT NOT NULL,
    titre             VARCHAR(150) NOT NULL,
    type_calcul       VARCHAR(80) NOT NULL,

    -- Configuration du champ 1
    champ1_label      VARCHAR(100),
    champ1_type       VARCHAR(50),
    champ1_min        DECIMAL(8,2),
    champ1_max        DECIMAL(8,2),

    -- Configuration du champ 2
    champ2_label      VARCHAR(100),
    champ2_type       VARCHAR(50),
    champ2_options    TEXT,

    -- Configuration du champ 3
    champ3_label      VARCHAR(100),
    champ3_type       VARCHAR(50),

    -- Logique et affichage du resultat
    formule_calcul    TEXT,
    unite_resultat    VARCHAR(50),
    texte_resultat    VARCHAR(200),

    actif             BOOLEAN DEFAULT TRUE,
    created_at        TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_simulateurs_service
        FOREIGN KEY (id_service)
        REFERENCES services(id_service)
        ON DELETE RESTRICT
);

COMMENT ON TABLE simulateurs IS 'Configuration des 4 calculateurs interactifs';
COMMENT ON COLUMN simulateurs.type_calcul IS 'Cle technique: economie_chauffage, score_dpe, etc.';
COMMENT ON COLUMN simulateurs.champ2_options IS 'Options JSON si type=select';


-- ============================================================
-- ÉTAPE 5 : TABLE ARTICLES (160 pages SEO)
-- ============================================================

CREATE TABLE IF NOT EXISTS articles (
    id_article          BIGSERIAL PRIMARY KEY,
    id_keyword          BIGINT NOT NULL UNIQUE,
    id_service          BIGINT NOT NULL,
    id_simulateur       BIGINT NOT NULL,

    titre               VARCHAR(200) NOT NULL,
    meta_description    VARCHAR(300),

    contenu             TEXT,
    date_creation       TIMESTAMPTZ DEFAULT NOW(),
    date_modification   TIMESTAMPTZ,
    actif               BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_articles_keyword
        FOREIGN KEY (id_keyword)
        REFERENCES keywords(id_keyword)
        ON DELETE RESTRICT,

    CONSTRAINT fk_articles_service
        FOREIGN KEY (id_service)
        REFERENCES services(id_service)
        ON DELETE RESTRICT,

    CONSTRAINT fk_articles_simulateur
        FOREIGN KEY (id_simulateur)
        REFERENCES simulateurs(id_simulateur)
        ON DELETE RESTRICT
);

COMMENT ON TABLE articles IS '160 pages SEO, une par keyword';
COMMENT ON COLUMN articles.titre IS 'Titre H1 affiche en haut de la page';
COMMENT ON COLUMN articles.meta_description IS 'Description SEO affichee dans Google';


-- ============================================================
-- ÉTAPE 6 : TABLE LEADS (les prospects - objectif final)
-- ============================================================

CREATE TABLE IF NOT EXISTS leads (
    id_lead              BIGSERIAL PRIMARY KEY,

    -- Cles etrangeres (auto)
    id_article           BIGINT,
    id_service           BIGINT,
    id_keyword           BIGINT,

    -- CHAMPS VISIBLES DANS LE FORMULAIRE (saisis par le visiteur)
    nom_complet          VARCHAR(200) NOT NULL,
    telephone            VARCHAR(20) NOT NULL,
    ville                VARCHAR(100) NOT NULL,
    consentement_rgpd    BOOLEAN DEFAULT FALSE,

    -- CHAMPS AUTO DEPUIS SIMULATEUR (le visiteur ne les voit pas)
    superficie           INTEGER,
    type_chauffage       VARCHAR(80),
    type_logement        type_logement_enum,
    annee_construction   INTEGER,
    resultat_simulation  JSONB,
    valeur_simulation    DECIMAL(10,2),

    -- CHAMPS TECHNIQUES (auto)
    statut               statut_lead DEFAULT 'nouveau',
    source_utm           VARCHAR(200),
    campagne_utm         VARCHAR(200),
    ip_address           VARCHAR(45),
    date_soumission      TIMESTAMPTZ DEFAULT NOW(),
    notes                TEXT,

    CONSTRAINT fk_leads_article
        FOREIGN KEY (id_article)
        REFERENCES articles(id_article)
        ON DELETE SET NULL,

    CONSTRAINT fk_leads_service
        FOREIGN KEY (id_service)
        REFERENCES services(id_service)
        ON DELETE SET NULL,

    CONSTRAINT fk_leads_keyword
        FOREIGN KEY (id_keyword)
        REFERENCES keywords(id_keyword)
        ON DELETE SET NULL
);

COMMENT ON TABLE leads IS 'Prospects generes par le site (objectif final)';
COMMENT ON COLUMN leads.nom_complet IS 'Champ visible 1/3 dans le formulaire';
COMMENT ON COLUMN leads.telephone IS 'Champ visible 2/3 dans le formulaire';
COMMENT ON COLUMN leads.ville IS 'Champ visible 3/3 dans le formulaire';


-- ============================================================
-- ÉTAPE 7 : INDEX (pour accelerer le site)
-- ============================================================

-- Index sur les slugs URL (utilises par le router)
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_keywords_slug_url ON keywords(slug_url);

-- Index sur les cles etrangeres (acceleration des JOIN)
CREATE INDEX IF NOT EXISTS idx_keywords_service ON keywords(id_service);
CREATE INDEX IF NOT EXISTS idx_articles_keyword ON articles(id_keyword);
CREATE INDEX IF NOT EXISTS idx_articles_service ON articles(id_service);
CREATE INDEX IF NOT EXISTS idx_articles_simulateur ON articles(id_simulateur);
CREATE INDEX IF NOT EXISTS idx_simulateurs_service ON simulateurs(id_service);
CREATE INDEX IF NOT EXISTS idx_leads_article ON leads(id_article);
CREATE INDEX IF NOT EXISTS idx_leads_service ON leads(id_service);
CREATE INDEX IF NOT EXISTS idx_leads_keyword ON leads(id_keyword);

-- Index sur les filtres frequents du call center
CREATE INDEX IF NOT EXISTS idx_leads_statut ON leads(statut);
CREATE INDEX IF NOT EXISTS idx_leads_date_soumission ON leads(date_soumission DESC);
CREATE INDEX IF NOT EXISTS idx_leads_telephone ON leads(telephone);

-- Index sur les champs "actif" (filtrage des contenus en ligne)
CREATE INDEX IF NOT EXISTS idx_services_actif ON services(actif) WHERE actif = TRUE;
CREATE INDEX IF NOT EXISTS idx_articles_actif ON articles(actif) WHERE actif = TRUE;
CREATE INDEX IF NOT EXISTS idx_keywords_actif ON keywords(actif) WHERE actif = TRUE;


-- ============================================================
-- ÉTAPE 8 : DONNÉES DE BASE (les 4 services)
-- ============================================================

INSERT INTO services (nom_service, description, icone, slug) VALUES
    ('Bilan Energetique', 'Diagnostic complet de la performance energetique de votre logement.', 'fa-leaf', 'bilan-energetique'),
    ('Isolation', 'Solutions d''isolation thermique pour reduire vos pertes energetiques.', 'fa-house', 'isolation'),
    ('Chauffage', 'Installation et remplacement de systemes de chauffage performants.', 'fa-fire', 'chauffage'),
    ('Charpente', 'Renovation et entretien de charpentes traditionnelles ou industrielles.', 'fa-hammer', 'charpente')
ON CONFLICT (slug) DO NOTHING;


-- ============================================================
-- ÉTAPE 9 : DONNÉES DE BASE (les 4 simulateurs)
-- ============================================================

INSERT INTO simulateurs (
    id_service, titre, type_calcul,
    champ1_label, champ1_type, champ1_min, champ1_max,
    champ2_label, champ2_type, champ2_options,
    formule_calcul, unite_resultat, texte_resultat
)
SELECT
    s.id_service,
    'Calculez votre score DPE',
    'score_dpe',
    'Surface (m2)', 'number', 20, 500,
    'Annee construction', 'number', NULL,
    '{"coeff": 1.2}',
    'points',
    'Votre score DPE estime : {result}'
FROM services s WHERE s.slug = 'bilan-energetique'
ON CONFLICT DO NOTHING;

INSERT INTO simulateurs (
    id_service, titre, type_calcul,
    champ1_label, champ1_type, champ1_min, champ1_max,
    champ2_label, champ2_type, champ2_options,
    formule_calcul, unite_resultat, texte_resultat
)
SELECT
    s.id_service,
    'Calculez vos economies d''isolation',
    'economie_isolation',
    'Surface combles (m2)', 'number', 10, 300,
    'Type d''isolation', 'select', '["Laine de verre","Ouate de cellulose","Polystyrene"]',
    '{"laine_de_verre": 12, "ouate_de_cellulose": 15, "polystyrene": 10}',
    'EUR/an',
    'Vous pouvez economiser {result} par an'
FROM services s WHERE s.slug = 'isolation'
ON CONFLICT DO NOTHING;

INSERT INTO simulateurs (
    id_service, titre, type_calcul,
    champ1_label, champ1_type, champ1_min, champ1_max,
    champ2_label, champ2_type, champ2_options,
    formule_calcul, unite_resultat, texte_resultat
)
SELECT
    s.id_service,
    'Calculez vos economies de chauffage',
    'economie_chauffage',
    'Surface chauffee (m2)', 'number', 20, 500,
    'Type de chauffage actuel', 'select', '["Gaz","Electrique","Fioul","Pompe a chaleur"]',
    '{"gaz": 15, "electrique": 25, "fioul": 30, "pompe_a_chaleur": 8}',
    'EUR/an',
    'Vous pouvez economiser {result} par an'
FROM services s WHERE s.slug = 'chauffage'
ON CONFLICT DO NOTHING;

INSERT INTO simulateurs (
    id_service, titre, type_calcul,
    champ1_label, champ1_type, champ1_min, champ1_max,
    champ2_label, champ2_type, champ2_options,
    formule_calcul, unite_resultat, texte_resultat
)
SELECT
    s.id_service,
    'Evaluez l''etat de votre charpente',
    'etat_charpente',
    'Surface toiture (m2)', 'number', 20, 500,
    'Age de la charpente (annees)', 'number', NULL,
    '{"facteur_age": 0.5}',
    'points sur 10',
    'Etat estime de votre charpente : {result}/10'
FROM services s WHERE s.slug = 'charpente'
ON CONFLICT DO NOTHING;


-- ============================================================
-- VÉRIFICATION FINALE
-- ============================================================
-- Apres execution, lancer ces requetes pour verifier :
--
-- SELECT * FROM services;       -- doit afficher 4 lignes
-- SELECT * FROM simulateurs;    -- doit afficher 4 lignes
-- SELECT * FROM keywords;       -- 0 ligne (a remplir plus tard)
-- SELECT * FROM articles;       -- 0 ligne (a remplir plus tard)
-- SELECT * FROM leads;          -- 0 ligne (se remplit avec le site)
--
-- ============================================================
-- FIN DU SCRIPT
-- ============================================================