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
docker build -t rinha-compiler .
```

4. Docker run:

```
docker run -v $(pwd)/files:/var/rinha/ rinha-compiler /var/rinha/source.rinha
```

## License

All the packages and extensions in this project are covered by their respective licenses.

All other files are covered by the MIT license, see [LICENSE](./LICENSE).
