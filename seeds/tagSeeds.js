const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'Titlest',
  },
  {
    tag_name: 'Callaway',
  },
  {
    tag_name: 'Adidas',
  },
  {
    tag_name: 'Taylor Made',
  },
  {
    tag_name: 'Winter',
  },
  {
    tag_name: 'Fall',
  },
  {
    tag_name: 'Summer',
  },
  {
    tag_name: 'Spring',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;