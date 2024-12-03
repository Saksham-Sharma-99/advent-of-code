file_path = 'input.txt'

string = File.readlines(file_path).to_s

mul_array = ['m', 'u', 'l', '(', ',', ')']
numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

valid_string = string.split('')

numbers_started = false
number1 = ''
number2 = ''

numbers_array = []
mul_index = 0

dont_enabled = false

dont_array = ['d', 'o', 'n', "'", 't', '(', ')']
do_array  = ['d', 'o', '(', ')']
dont_index = 0
do_index = 0;

puts valid_string.join('')

valid_string.each do |char|
  if char == dont_array[dont_index]
    if dont_array[dont_index] == ')'
      dont_enabled = true
      dont_index = 0
    else
      dont_index += 1
    end
  else
    dont_index = 0
  end

  if char == do_array[do_index]
    if do_array[do_index] == ')'
      dont_enabled = false
      do_index = 0
    else
      do_index += 1
    end
  else
    do_index = 0
  end

  if char == mul_array[mul_index]
    if char == ')'
      if !number1.empty? && !number2.empty? && !dont_enabled
        numbers_array << [number1.to_i, number2.to_i]
      end

      mul_index = 0
      numbers_started = false
      number1 = ''
      number2 = ''
    else
      mul_index += 1
      numbers_started = mul_index > 3
    end
  elsif numbers.include?(char) && numbers_started
    if mul_index > 4
      number2 += char
    else
      number1 += char
    end
  else
    mul_index = 0
    numbers_started = false
    number1 = ''
    number2 = ''
  end
end

mul_array_numbers = numbers_array.map { |arr| arr.first * arr.last }
ans = mul_array_numbers.sum
puts ans
