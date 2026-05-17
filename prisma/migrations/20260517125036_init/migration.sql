-- CreateEnum
CREATE TYPE "statut_lead" AS ENUM ('nouveau', 'a_rappeler', 'contacte', 'converti', 'perdu');

-- CreateEnum
CREATE TYPE "type_logement_enum" AS ENUM ('maison', 'appartement', 'autre');

-- CreateTable
CREATE TABLE "services" (
    "id_service" BIGSERIAL NOT NULL,
    "nom_service" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "icone" VARCHAR(100),
    "slug" VARCHAR(100) NOT NULL,
    "actif" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id_service")
);

-- CreateTable
CREATE TABLE "keywords" (
    "id_keyword" BIGSERIAL NOT NULL,
    "id_service" BIGINT NOT NULL,
    "mot_cle" VARCHAR(200) NOT NULL,
    "slug_url" VARCHAR(200) NOT NULL,
    "region" VARCHAR(100),
    "volume_recherche" INTEGER,
    "cpc_estime" DECIMAL(6,2),
    "position_google" INTEGER,
    "actif" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id_keyword")
);

-- CreateTable
CREATE TABLE "simulateurs" (
    "id_simulateur" BIGSERIAL NOT NULL,
    "id_service" BIGINT NOT NULL,
    "titre" VARCHAR(150) NOT NULL,
    "type_calcul" VARCHAR(80) NOT NULL,
    "champ1_label" VARCHAR(100),
    "champ1_type" VARCHAR(50),
    "champ1_min" DECIMAL(8,2),
    "champ1_max" DECIMAL(8,2),
    "champ2_label" VARCHAR(100),
    "champ2_type" VARCHAR(50),
    "champ2_options" TEXT,
    "champ3_label" VARCHAR(100),
    "champ3_type" VARCHAR(50),
    "formule_calcul" TEXT,
    "unite_resultat" VARCHAR(50),
    "texte_resultat" VARCHAR(200),
    "actif" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulateurs_pkey" PRIMARY KEY ("id_simulateur")
);

-- CreateTable
CREATE TABLE "articles" (
    "id_article" BIGSERIAL NOT NULL,
    "id_keyword" BIGINT NOT NULL,
    "id_service" BIGINT NOT NULL,
    "id_simulateur" BIGINT NOT NULL,
    "titre" VARCHAR(200) NOT NULL,
    "meta_description" VARCHAR(300),
    "contenu" TEXT,
    "image_url" VARCHAR(500),
    "image_alt" VARCHAR(200),
    "date_creation" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMPTZ(6),
    "actif" BOOLEAN DEFAULT true,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id_article")
);

-- CreateTable
CREATE TABLE "leads" (
    "id_lead" BIGSERIAL NOT NULL,
    "id_article" BIGINT,
    "id_service" BIGINT,
    "id_keyword" BIGINT,
    "id_simulateur" BIGINT,
    "nom_complet" VARCHAR(200) NOT NULL,
    "telephone" VARCHAR(20) NOT NULL,
    "ville" VARCHAR(100) NOT NULL,
    "consentement_rgpd" BOOLEAN DEFAULT false,
    "superficie" INTEGER,
    "type_chauffage" VARCHAR(80),
    "type_logement" "type_logement_enum",
    "annee_construction" INTEGER,
    "resultat_simulation" JSONB,
    "valeur_simulation" DECIMAL(10,2),
    "statut" "statut_lead" DEFAULT 'nouveau',
    "source_utm" VARCHAR(200),
    "campagne_utm" VARCHAR(200),
    "ip_address" VARCHAR(45),
    "date_soumission" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id_lead")
);

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE INDEX "idx_services_actif" ON "services"("actif") WHERE (actif = true);

-- CreateIndex
CREATE INDEX "idx_services_slug" ON "services"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "keywords_mot_cle_key" ON "keywords"("mot_cle");

-- CreateIndex
CREATE UNIQUE INDEX "keywords_slug_url_key" ON "keywords"("slug_url");

-- CreateIndex
CREATE INDEX "idx_keywords_actif" ON "keywords"("actif") WHERE (actif = true);

-- CreateIndex
CREATE INDEX "idx_keywords_service" ON "keywords"("id_service");

-- CreateIndex
CREATE INDEX "idx_keywords_slug_url" ON "keywords"("slug_url");

-- CreateIndex
CREATE INDEX "idx_simulateurs_service" ON "simulateurs"("id_service");

-- CreateIndex
CREATE UNIQUE INDEX "articles_id_keyword_key" ON "articles"("id_keyword");

-- CreateIndex
CREATE INDEX "idx_articles_actif" ON "articles"("actif") WHERE (actif = true);

-- CreateIndex
CREATE INDEX "idx_articles_keyword" ON "articles"("id_keyword");

-- CreateIndex
CREATE INDEX "idx_articles_service" ON "articles"("id_service");

-- CreateIndex
CREATE INDEX "idx_articles_simulateur" ON "articles"("id_simulateur");

-- CreateIndex
CREATE INDEX "idx_leads_article" ON "leads"("id_article");

-- CreateIndex
CREATE INDEX "idx_leads_date_soumission" ON "leads"("date_soumission" DESC);

-- CreateIndex
CREATE INDEX "idx_leads_keyword" ON "leads"("id_keyword");

-- CreateIndex
CREATE INDEX "idx_leads_service" ON "leads"("id_service");

-- CreateIndex
CREATE INDEX "idx_leads_simulateur" ON "leads"("id_simulateur");

-- CreateIndex
CREATE INDEX "idx_leads_statut" ON "leads"("statut");

-- CreateIndex
CREATE INDEX "idx_leads_telephone" ON "leads"("telephone");

-- AddForeignKey
ALTER TABLE "keywords" ADD CONSTRAINT "fk_keywords_service" FOREIGN KEY ("id_service") REFERENCES "services"("id_service") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "simulateurs" ADD CONSTRAINT "fk_simulateurs_service" FOREIGN KEY ("id_service") REFERENCES "services"("id_service") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "fk_articles_keyword" FOREIGN KEY ("id_keyword") REFERENCES "keywords"("id_keyword") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "fk_articles_service" FOREIGN KEY ("id_service") REFERENCES "services"("id_service") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "fk_articles_simulateur" FOREIGN KEY ("id_simulateur") REFERENCES "simulateurs"("id_simulateur") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "fk_leads_article" FOREIGN KEY ("id_article") REFERENCES "articles"("id_article") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "fk_leads_keyword" FOREIGN KEY ("id_keyword") REFERENCES "keywords"("id_keyword") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "fk_leads_service" FOREIGN KEY ("id_service") REFERENCES "services"("id_service") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "fk_leads_simulateur" FOREIGN KEY ("id_simulateur") REFERENCES "simulateurs"("id_simulateur") ON DELETE SET NULL ON UPDATE NO ACTION;
