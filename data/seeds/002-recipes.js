exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('recipes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {
          name: 'Southern-Style Egg Salad',
          source: 'Walter',
          category: 'Sandwich',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8100470.jpg',
          user_id: 1,
        },
        {
          name: 'Honey Chicken Kabobs',
          source: 'Ann Marie',
          category: 'Grill',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 2,
        },
        {
          name: 'Pesto Grilled Cheese Sandwich',
          source: 'Uncle Ray',
          category: 'Sandwich',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4543319.jpg',
          user_id: 3,
        },
        {
          name: 'Strawberry Oatmeal Breakfast Smoothie',
          source: 'Phoebe',
          category: 'Breakfast',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F959492.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 4,
        },
        {
          name: 'Lemon-Ricotta Cornmeal Waffles',
          source: 'Aunt Kim',
          category: 'Breakfast',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6879705.jpg',
          user_id: 5,
        },
        {
          name: 'Bacon and Egg Tacos',
          source: 'Betsy',
          category: 'Breakfast',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4484963.jpg',
          user_id: 6,
        },
      ]);
    });
};
