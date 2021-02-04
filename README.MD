# Notas compartilhadas

### 
Código feito por [Bryan Pinheiro](https://github.com/BryanSouza) e [Matheus Ferreira da Costa](https://github.com/matheusferr).
[Documentação](https://cbt-ifsp-tcc-react.netlify.app/notascompartilhadas) feita por Rafela Silva e [Welton José](https://github.com/not-lew).

## Tabela de conteúdo

- [Sobre o Projeto](#sobre-o-projeto)
- [Nota](#nota)
- [Instalação](#instala%C3%A7%C3%A3o)
- [Como usar](#como-usar)
- [Build](#build)
- [Licença](#licen%C3%A7a)

## Sobre o Projeto

Este projeto visa demonstrar a construção de um CRUD utilizando o banco de dados Firebase e o React Native.

## Nota

Você está no repositório da versão Firebase! [Configure a conexão](https://cbt-ifsp-tcc-react.netlify.app/notascompartilhadas) com o banco antes de compilar o aplicativo.

Também temos a [versão offline](https://github.com/matheusferr/GrupoReact418_Notas_Compartilhadas/tree/async-storage) que utiliza o banco local SQLite.

## Instalação

Clone este repositório com o comando:
```bash
git clone https://github.com/matheusferr/GrupoReact418_Notas_Compartilhadas.git
```
* Entre no diretório **GrupoReact418_Notas_Compartilhadas** e instale as dependências utilizando o Yarn:
```bash
yarn
```

## Como Usar

Dentro do diretório do projeto, você pode executar os seguinte comandos:

### `yarn start`

Inicía o Metro Server para desenvolvimento do app.

A aplicação atualizará automaticamente quando você editar o código.

### `yarn android`

Compila a versão debug e instala nos dipositivos android conectados via **ADB**. Caso não encontre nenhum dispositivo, o emulador será iniciado.

### `yarn android`

Compila a versão debug e instala no emulador iOS.

### Build
Entre no diretório **android** e execute o seguinte comando:
```bash
./gradlew assembleRelease
```
O **apk** será gerado em **android/app/build/outputs/apk/release** após a conclusão do processo.

## Licença

[MIT License](https://opensource.org/licenses/MIT)
