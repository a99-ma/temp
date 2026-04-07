<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categorie;
use App\Models\Plat;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Créer la catégorie "Plats Marocains"
        $categorie = Categorie::firstOrCreate(
            ['nom' => 'Plats Marocains'],
            ['description' => 'Cuisine traditionnelle marocaine']
        );

        // 10 plats marocains avec prix en DH et quantité de stock
        $plats = [
            [
                'nom' => 'Tagine de poulet au citron et olives',
                'description' => 'Ragoût traditionnel marocain avec poulet tendre, citrons conservés et olives vertes',
                'prix' => 89.99,
                'est_disponible' => true,
                'est_vegetarien' => false,
                'est_halal' => true,
                'est_sans_gluten' => true,
                'quantite_stock' => rand(5, 20),
            ],
            [
                'nom' => 'Couscous royal',
                'description' => 'Couscous moelleux garni de poulet, agneau, merguez et légumes variés',
                'prix' => 129.99,
                'est_disponible' => true,
                'est_vegetarien' => false,
                'est_halal' => true,
                'est_sans_gluten' => false,
                'quantite_stock' => rand(5, 20),
            ],
            [
                'nom' => 'Pastilla feuille',
                'description' => 'Feuilletage croustillant garni de poulet effiloché, œufs et épices douces',
                'prix' => 79.99,
                'est_disponible' => true,
                'est_vegetarien' => false,
                'est_halal' => true,
                'est_sans_gluten' => false,
                'quantite_stock' => rand(5, 20),
            ],
            [
                'nom' => 'Briwats à la viande',
                'description' => 'Petits beignets triangulaires croustillants fourrés à la viande hachée',
                'prix' => 45.99,
                'est_disponible' => true,
                'est_vegetarien' => false,
                'est_halal' => true,
                'est_sans_gluten' => false,
                'quantite_stock' => rand(5, 20),
            ],
            [
                'nom' => 'Harira traditionnelle',
                'description' => 'Soupe riche et épaisse à base de pois chiches, lentilles et viande',
                'prix' => 39.99,
                'est_disponible' => true,
                'est_vegetarien' => false,
                'est_halal' => true,
                'est_sans_gluten' => true,
                'quantite_stock' => rand(5, 20),
            ],
            [
                'nom' => 'Koftas d\'agneau',
                'description' => 'Brochettes d\'agneau haché parfumées aux épices marocaines',
                'prix' => 99.99,
                'est_disponible' => true,
                'est_vegetarien' => false,
                'est_halal' => true,
                'est_sans_gluten' => true,
                'quantite_stock' => rand(5, 20),
            ],
            [
                'nom' => 'Tajine de poisson',
                'description' => 'Poisson blanc cuit lentement avec tomates, oignons et épices',
                'prix' => 119.99,
                'est_disponible' => true,
                'est_vegetarien' => false,
                'est_halal' => true,
                'est_sans_gluten' => true,
                'quantite_stock' => rand(5, 20),
            ],
            [
                'nom' => 'Salade marocaine',
                'description' => 'Mélange frais de tomates, concombres, oignons et coriandre avec huile d\'olive',
                'prix' => 35.99,
                'est_disponible' => true,
                'est_vegetarien' => true,
                'est_halal' => true,
                'est_sans_gluten' => true,
                'quantite_stock' => rand(5, 20),
            ],
            [
                'nom' => 'Msemen au beurre',
                'description' => 'Pâte feuilletée marocaine beurrée et sucrée, souvent servie au petit-déjeuner',
                'prix' => 29.99,
                'est_disponible' => true,
                'est_vegetarien' => true,
                'est_halal' => true,
                'est_sans_gluten' => false,
                'quantite_stock' => rand(5, 20),
            ],
            [
                'nom' => 'Mechoui (agneau rôti)',
                'description' => 'Agneau entier rôti à la broche jusqu\'à tendreté, servi avec pain et harissa',
                'prix' => 159.99,
                'est_disponible' => true,
                'est_vegetarien' => false,
                'est_halal' => true,
                'est_sans_gluten' => true,
                'quantite_stock' => rand(5, 20),
            ],
        ];

        // Insérer les plats
        foreach ($plats as $plat) {
            Plat::create(array_merge($plat, ['categorie_id' => $categorie->id]));
        }

        $this->command->info('10 plats marocains créés avec succès!');
    }
}