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

list1 = list1.sort
list2 = list2.sort
ans = 0

list1.each_with_index do |l1, index|
  l2 = list2[index]
  sum_value = (l1 - l2).abs
  ans += sum_value
end

puts ans
