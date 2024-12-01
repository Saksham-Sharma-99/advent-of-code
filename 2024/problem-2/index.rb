file_path = 'input.txt'

numbers = File.readlines(file_path).map(&:strip).reject(&:empty?).map(&:to_i)

list1 = []
list2 = []
numbers.each_with_index do |n, i|
  if i.even?
    list1 << n
  else
    list2 << n
  end
end

weighted_count = 0


list1.each do |l1|
  current_number_count = list2.count(l1)
  current_weighted_count = l1 * current_number_count
  weighted_count += current_weighted_count
end

puts weighted_count
