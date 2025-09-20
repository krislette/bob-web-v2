<h1 align="center">Bach or Bot</h1>

Repository for the tool used to demonstrate the model under the same name, <a href="https://github.com/krislette/bach-or-bot"> bach or bot</a>. This website is currently in progress.

## Todo

- [x] Document this repo
- [ ] Make it fully responsive (currently at ~70% as I have estimated)
- [ ] Integrate API
- [ ] Finalize XAI results display
- [ ] More UI tweaks(?)
- [ ] Add license

## Run

Learning docker so I'll leave this note here (imagine practicing on your official project repository) anyways...

If I want to map the app to a specific port locally:

```bash
docker run -p 5173:3000
```

Or just really use the original port:

```bash
docker run -p 5173:5173
```

And for the complete run command:

```bash
docker run -p 5173:5173 bob-web:dev
```

# Moving Forward

If I really want to deploy it, I have to build first using:

```bash
# To create a dist dir
npm run build
```

Then use the static files produced by dist for prod, and couple it with nginx. Guess I'll see this in action once this repo is done
