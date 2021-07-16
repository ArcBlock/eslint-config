git config --local user.name "wangshijun"
git config --local user.email "wangshijun2010@gmail.com"

git remote remove origin
git remote add origin "https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"
git remote -v

changed=$(lerna changed --force-publish)
echo "lerna changed ${changed}"
if [ "$changed" != "" ]; then
  DEBUG=* node tools/setup-ci.js
  yarn build

  git checkout master
  git commit -am "[skip travis] update yarn.lock file"
  git push origin master

  # publish
  VERSION=$(cat version | awk '{$1=$1;print}')
  echo "publish version ${VERSION}"
  lerna publish $VERSION --force-publish --yes

  # trigger cnpm sync
  node tools/post-publish.js

  # update readme
  node tools/update-readme.js
  git commit -am '[skip travis] update readme'
  git push origin master
fi

if [ "$changed" = "" ]; then
  make release
fi
