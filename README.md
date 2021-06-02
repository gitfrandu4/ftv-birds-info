# Fuerteventura Birds-Info 🦅

## Deployment 🚀

### Deploy to GitHub Pages 📚

Seguimos los pasos

1. Creamos el repositorio de GitHub para nuestro proyecto

2. Configuramos `Git` en nuestro repositorio local para conectarlo con el repositorio remoto. Los comandos son similares a los siguientes:

```
git remote add origin https://github.com/gitfrandu4/ftv-birds-info
git branch -M main
git push -u origin main
```

3. Create and check out a git branch named gh-pages.

```
git checkout -b gh-pages
```

4. Hacemos build del prouecto utilizando el comando de Angular CLI `ng build`.

```
ng build --output-path docs --base-href /your_project_name/

Nota: /your_project_name/ es el nombre del proyecto especificado en el paso 1. 
Debemos incluir los slashes. 

ng build --output-path docs --base-href=""
```

5. Cuando se completa el build copiamos `docs/index.html` en un nuevo archivo y lo renombramos como `docs/404.html`.

6. Commit + push

7. En el proyecto de Github > Settings > GitHub Pages > Configuramos el sitio para publicar desde la carpeta `docs`.

8. Save

9. Accedemos al enlace donde se ha desplegado el proyecto: https://gitfrandu4.github.io/ftv-birds-info/

Ayuda: https://angular.io/guide/deployment