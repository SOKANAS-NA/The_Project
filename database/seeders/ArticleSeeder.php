<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::whereHas('roles', function($q) {
            $q->whereIn('slug', ['admin', 'webmaster', 'author']);
        })->get();
        $categories = Category::all();
        $tags = Tag::all();

        $articles = [
            [
                'title' => 'PSG remporte la Ligue des Champions',
                'excerpt' => 'Le Paris Saint-Germain décroche enfin la Champions League tant attendue.',
                'content' => 'Dans un match palpitant au Stade de France, le Paris Saint-Germain a remporté sa première Ligue des Champions face au Real Madrid. Kylian Mbappé a été l\'homme du match avec un doublé décisif, tandis que Gianluigi Donnarumma a réalisé plusieurs arrêts spectaculaires. Cette victoire historique marque l\'apogée d\'une saison exceptionnelle pour le club parisien.',
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'featured_image' => 'images/stade.jpg',
            ],
            [
                'title' => 'Novak Djokovic gagne Wimbledon',
                'excerpt' => 'Le joueur serbe remporte son 8ème titre à Wimbledon.',
                'content' => 'Novak Djokovic a écrit une nouvelle page de l\'histoire du tennis en remportant son 8ème titre à Wimbledon. Face à Carlos Alcaraz en finale, le Serbe a livré une performance magistrale, remportant le match en 4 sets (6-4, 6-3, 5-7, 6-4). Cette victoire lui permet de se rapprocher du record de Grand Chelem détenu par Rafael Nadal.',
                'status' => 'published',
                'published_at' => now()->subDays(4),
                'featured_image' => 'images/portrait.jpg',
            ],
            [
                'title' => 'L\'équipe de France qualifiée pour les JO 2024',
                'excerpt' => 'Les Bleus se qualifient brillamment pour les Jeux Olympiques de Paris.',
                'content' => 'L\'équipe de France de football a validé son ticket pour les Jeux Olympiques de Paris 2024 en dominant l\'Ukraine en finale du tournoi de qualification. Les jeunes talents français ont brillé tout au long de la compétition, avec notamment des performances remarquables de Warren Zaïre-Emery et de Mathys Tel. Cette qualification renforce les ambitions de médaille d\'or des Bleus pour les JO à domicile.',
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'featured_image' => 'images/action-de-footballeur-sur-le-stade.jpg',
            ],
            [
                'title' => 'Kylian Mbappé rejoint le Real Madrid',
                'excerpt' => 'L\'attaquant français signe enfin son contrat avec les Merengues.',
                'content' => 'Après des mois de spéculations, Kylian Mbappé a officialisé son transfert au Real Madrid. L\'attaquant français a signé un contrat de 5 ans avec le club madrilène, mettant fin à son aventure parisienne. "C\'est un rêve qui se réalise", a déclaré le joueur lors de sa présentation au Santiago Bernabéu. Ce transfert record marque un tournant majeur dans l\'histoire du football moderne.',
                'status' => 'published',
                'published_at' => now()->subDays(6),
                'featured_image' => 'images/homme-plein-coup-jouant-au-football.jpg',
            ],
            [
                'title' => 'Roland Garros : Victoire surprise en finale',
                'excerpt' => 'Un joueur outsider crée la sensation sur la terre battue parisienne.',
                'content' => 'Dans un scénario digne d\'un film, le jeune Italien Lorenzo Musetti a créé la sensation en remportant Roland Garros face au favori Jannik Sinner. À seulement 22 ans, Musetti a livré une performance exceptionnelle, remportant le match en 5 sets épiques. Cette victoire inattendue marque l\'émergence d\'une nouvelle star du tennis mondial.',
                'status' => 'published',
                'published_at' => now()->subDays(7),
                'featured_image' => 'images/joueuse-de-tennis-femme-regardant-la-camera.jpg',
            ],
            [
                'title' => 'Tour de France 2024 : Un parcours exceptionnel',
                'excerpt' => 'La Grande Boucle promet des étapes spectaculaires cette année.',
                'content' => 'Le parcours du Tour de France 2024 a été dévoilé, promettant une édition particulièrement exigeante. Avec 21 étapes réparties sur 3 500 kilomètres, les coureurs devront affronter des cols mythiques des Alpes et des Pyrénées. La Grande Boucle débutera à Florence et s\'achèvera sur les Champs-Élysées, avec une étape contre-la-montre décisive à Nice.',
                'status' => 'published',
                'published_at' => now()->subDays(8),
                'featured_image' => 'images/femmes-cyclistes-professionnelles.jpg',
            ],
            [
                'title' => 'Marseille recrute un nouveau buteur',
                'excerpt' => 'L\'OM officialise l\'arrivée de sa nouvelle star offensive.',
                'content' => 'L\'Olympique de Marseille a officialisé le recrutement de l\'attaquant brésilien Gabriel Barbosa, dit "Gabigol". Le joueur de 27 ans arrive de Flamengo pour un montant record de 25 millions d\'euros. "Je suis ravi de rejoindre ce grand club et de découvrir le championnat français", a déclaré le nouveau buteur marseillais.',
                'status' => 'published',
                'published_at' => now()->subDays(9),
                'featured_image' => 'images/concept-de-football-amateur-avec-gradien-de.jpg',
            ],
            [
                'title' => 'Championnat du monde de natation : Records battus',
                'excerpt' => 'Plusieurs records du monde tombent lors des championnats à Paris.',
                'content' => 'Les Championnats du monde de natation à Paris ont été marqués par des performances exceptionnelles. La Française Léon Marchand a battu le record du monde du 400m 4 nages, tandis que l\'Australien Kyle Chalmers a pulvérisé celui du 100m nage libre. Ces championnats ont confirmé l\'émergence d\'une nouvelle génération de nageurs talentueux.',
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'featured_image' => 'images/nageuse-avec-bonnet-et-lunettes-nageant-dans-l-eau.jpg',
            ],
            [
                'title' => 'Jeux Paralympiques : La France brille',
                'excerpt' => 'Les athlètes français récoltent de nombreuses médailles.',
                'content' => 'La délégation française aux Jeux Paralympiques a réalisé une performance historique en remportant 45 médailles, dont 15 en or. Les athlètes tricolores ont particulièrement brillé en athlétisme et en natation. Cette moisson de médailles confirme la place de la France parmi les grandes nations du sport paralympique.',
                'status' => 'published',
                'published_at' => now()->subDays(11),
                'featured_image' => 'images/outils-de-sport.jpg'
            ],
            [
                'title' => 'Ligue 1 : Derby attendu ce weekend',
                'excerpt' => 'Le choc entre Lyon et Saint-Étienne fait déjà parler.',
                'content' => 'Le derby entre l\'Olympique Lyonnais et l\'AS Saint-Étienne promet d\'être explosif ce weekend. Les deux équipes se retrouvent dans une situation délicate au classement, ce qui ajoute encore plus d\'enjeu à cette rencontre. Les supporters des deux clubs sont déjà mobilisés pour ce match qui s\'annonce comme l\'un des plus importants de la saison.',
                'status' => 'published',
                'published_at' => now()->subDays(13),
                'featured_image' => 'image/rues-de-la-ville-et-grands-immeubles-a-angle-eleve.jpg'
            ],
            [
                'title' => 'Formule 1 : Grand Prix de France confirmé',
                'excerpt' => 'Le circuit Paul Ricard accueillera à nouveau la F1.',
                'content' => 'Le Grand Prix de France de Formule 1 est officiellement reconduit pour les trois prochaines années. Le circuit Paul Ricard, situé au Castellet, accueillera l\'épreuve à partir de 2025. Cette annonce réjouit les fans français qui pourront à nouveau assister à une course de F1 sur le sol national.',
                'status' => 'draft',
                'published_at' => null,
            ],
            [
                'title' => 'Rugby : Le Tournoi des 6 Nations approche',
                'excerpt' => 'Les équipes se préparent pour le prestigieux tournoi.',
                'content' => 'Le Tournoi des 6 Nations 2024 s\'annonce comme l\'un des plus ouverts de l\'histoire. Les équipes de France, d\'Irlande et d\'Angleterre sont les favorites, mais l\'Écosse et le Pays de Galles pourraient créer la surprise. Les Bleus, tenants du titre, devront faire face à une pression particulière pour conserver leur couronne.',
                'status' => 'published',
                'published_at' => now()->subDays(15),
            ],
            [
                'title' => 'Handball : Montpellier remporte la Ligue des Champions',
                'excerpt' => 'Le club héraultais décroche son premier titre européen.',
                'content' => 'Le Montpellier Handball a écrit l\'histoire en remportant sa première Ligue des Champions face au Barça. Dans un match à suspense, les joueurs héraultais ont su résister à la pression pour s\'imposer 32-30. Cette victoire marque l\'apogée d\'une saison exceptionnelle pour le club français.',
                'status' => 'published',
                'published_at' => now()->subDays(16),
            ],
            [
                'title' => 'Athlétisme : Record de France du 100m battu',
                'excerpt' => 'Un nouvel espoir français explose les chronos.',
                'content' => 'Le jeune sprinteur français Thomas Laurent a battu le record de France du 100m en 9"89 lors des Championnats de France. À seulement 21 ans, l\'athlète a pulvérisé l\'ancien record détenu par Christophe Lemaitre. Cette performance prometteuse place la France sur la scène mondiale du sprint.',
                'status' => 'published',
                'published_at' => now()->subDays(17),
            ],
        ];

        foreach ($articles as $articleData) {
            $article = Article::create([
                ...$articleData,
                'user_id' => $users->random()->id,
                'category_id' => $categories->random()->id,
            ]);

            // Attacher des tags aléatoires
          
        }
    }
}