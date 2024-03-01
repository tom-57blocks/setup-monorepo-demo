# setup-monorepo-demo

1.create a new package under 'packages' directory, whose name is 'web'.(The name must be unique)

```
mkdir -p packages/web
cd packages/web
pnpm init
```

2. if we want install a dependency for 'web' package workspace.Here's the command to install it as a dev dependency:

```
pnpm add --save-dev typescript --filter web
```

3. if we want to install the 'web' package of this monorepo to 'web2', we can run the following commands:

```
pnpm add --save-dev web@workspace --filter web2
```

pnpm has a dedicated protocol \_workspace:<version> \_to resolve local workspaces with linking.
You might also want to change the workspace <version> to \*,like this:

```
"web": "workspace:*",
```

4.pnpm command:

```
pnpm install # install dependecies
pnpm lint   #lint and fix
pnpm build # build code
pnpm preittier # prettier code
```

5. git commit format, refer to [https://github.com/conventional-changelog/commitlint/#what-is-commitlint](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)

In general the pattern mostly looks like this:

```
type(scope?): subject
#scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

Real world examples can look like this:

```
git commit -m 'git chore: run tests on travis ci'
git commit -m 'fix(server): send cors headers'
git commit -m 'feat(blog): add comment section'
```

6.upgrade the versons of all packages which are modified,

```
lerna version
```

7.generate changelog

```
pnpm version:ci:norelease
```
