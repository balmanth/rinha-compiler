# RINHA COMPILER

![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
![license](https://badgen.net/github/license/balmanth/rinha-compiler)

## Motivation

The purpose of this project is to create an interpreter and AOT compiler for the [Rinha](https://github.com/aripiprazole/rinha-de-compiler) contest, different from the other participants I'll use [XCHEME](https://github.com/balmanth/xcheme) which's another project of my own, where I developed a new language designed for making lexers and parser.

## Get started

1. Clone:

```
git clone git@github.com:balmanth/rinha-compiler.git
```

2. Docker build:

```
docker build -t rinha .
```

4. Docker run (For RINHA requirements):

```
docker run --memory=2g --cpus=2 --volume=$(pwd)/files/source.rinha:/var/rinha/source.rinha rinha
```

5. If you wanna test out of the RINHA requirements:

```
docker run --volume=$(pwd)/files:/var/rinha/ rinha /var/rinha/extra/math_sqrt.rinha
```

## Optimization

Everyone knows using an interpreted language for interpreting another one is slow as hell, so down below are listed some optimizations made in order to make this challenge a bit fair compared to compiled languages.

1. Resolve literal expressions (constant folding)
2. Resolve reference aliases (constant propagation)
3. Remove unreferenced symbols and never used statements (dead code removal)
4. Memoization of pure and recursive functions (runtime)
5. Trampoline functions for avoiding stack overflows (runtime)

## License

All the packages and extensions in this project are covered by their respective licenses.

All other files are covered by the MIT license, see [LICENSE](./LICENSE).
