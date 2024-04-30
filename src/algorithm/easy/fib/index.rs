pub fn fib(num: u32) -> u32 {
    if num < 2 {
        return num;
    }

    let mut pre = 0;
    let mut cur = 1;
    for _ in 2..=num {
        let sum = pre + cur;
        pre = cur;
        cur = sum;
    }

    cur
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_fib() {
        assert_eq!(fib(2), 1);
        assert_eq!(fib(6), 8);
        assert_eq!(fib(10), 55);
        assert_eq!(fib(20), 6765);
        assert_eq!(fib(30), 832040);
    }
}
