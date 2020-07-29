exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('instructions')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('instructions').insert([
        {
          instruction:
            'Cover eggs with water in a sauce pan, bring to a low boil, and let boil slowly for 5 minutes. Remove from heat and let stand, covered, for 5 minutes.',
          recipe_id: 1,
        },
        {
          instruction:
            'Transfer eggs to ice water to chill for 5 minutes, then peel. Grate eggs into a mixing bowl and add all other ingredients. Mix well.',
          recipe_id: 1,
        },
        {
          instruction:
            'Chill egg salad in the refrigerator for at least 30 minutes before serving.',
          recipe_id: 1,
        },
        {
          instruction:
            'Whisk together oil, honey, soy sauce, and pepper in a large bowl. Place chicken, garlic, onions, and peppers in the bowl to marinate for at least 2 hrs.',
          recipe_id: 2,
        },
        { instruction: 'Preheat the grill to high heat.', recipe_id: 2 },
        {
          instruction:
            'Drain marinade from chicken and vegetables. Thread chicken and vegetables alternately onto the skewers.',
          recipe_id: 2,
        },
        {
          instruction:
            'Lighly oil the grill grate. Place the skewers on the grill and cook for 12-15 minutes. Turn and brush with reserved marinade frequently.',
          recipe_id: 2,
        },
        {
          instruction:
            'Spread one side of a slice of bread and place it butter side down into a non-stick skillet over medium heat.',
          recipe_id: 3,
        },
        {
          instruction:
            'Spread the top of the bread slice in the skillet with pesto, and place the provolone cheese, tomato slices, and American cheese onto the pesto.',
          recipe_id: 3,
        },
        {
          instruction:
            'Spread remaining pesto on one side of the second slice of bread, and place it pesto side down onto the sandwich. Butter the top side of the sandwich.',
          recipe_id: 3,
        },
        {
          instruction:
            'Fry the sandwich, flipping once, until both sides of the bread are golden brown and the cheese has melted, about 5 minutes per side.',
          recipe_id: 3,
        },
        {
          instruction:
            'In a blender, combine soy milk, oats, banana, and strawberries. Add vanilla and sugar if desired. Blend until smooth, then pour into glasses and serve immediately.',
          recipe_id: 4,
        },
        {
          instruction: `Preheat a waffle iron according to manufacturer's instructions`,
          recipe_id: 5,
        },
        {
          instruction:
            'Whisk flour, cornmeal, sugar, baking powder, baking soda, and salt together in a large bowl.',
          recipe_id: 5,
        },
        {
          instruction:
            'Whisk half-and-half, ricotta cheese, eggs, melted butter, and lemon extract together in a separate bowl. Then pour into the flour mixture and mix until thoroughly combined.',
          recipe_id: 5,
        },
        {
          instruction:
            'Coat the waffle iron in cooking spray, and then pour batter into the waffle iron in batches. Cook until crisp and golden brown, about 5 minutes.',
          recipe_id: 5,
        },
        {
          instruction: `Whisk eggs together in a bowl, then stir in bacon.`,
          recipe_id: 6,
        },
        {
          instruction:
            'Melt butter over medium heat in a skillet. Add egg mixture; cook and stir until eggs are completely set. Stir in American cheese, salt, and pepper.',
          recipe_id: 6,
        },
        {
          instruction:
            'Wrap tortillas in damp paper towels; microwave until warmed through, between 30 seconds to 1 minute.',
          recipe_id: 6,
        },
        {
          instruction:
            'Spoon 1/4 cup egg mixture into the center of each tortilla. Fold sides to cover, and serve with salsa.',
          recipe_id: 6,
        },
      ]);
    });
};
