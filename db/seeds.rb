# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

CSV.foreach('db/categories.csv', headers: true) do |row|
  Category.create(id: row['id'], name: row['name'], parent_id: row['parent_id'], grandparent_id: row['grandparent_id'])
end

# CSV.foreach('db/brands.csv', headers: true) do |row|
#   Brand.create(id: row['id'], created_at: row['created_at'], updated_at: row['updated_at'], name: row['name'])
# end
