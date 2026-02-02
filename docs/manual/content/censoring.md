# Censoring user-generated content

Site administrators will commonly want to censor certain words or phrases so they do not appear on their sites when posted by visting users.

XenForo has a comprehensive system for censoring content in this way, which is accessed through the **Censoring** section of the main XenForo options system at **Setup > Options > Censoring**.

To censor a word or a word fragment, enter your term in an empty *Words to censor* box. You may use a `*` wildcard character to match any text:

- `dog` matches `dog` only
- `dog*` matches `dog`, `dogs` and `dogmatic` etc.
- `d*g` matches `dog` and `dug` etc.
- `d*g*` matches `dog`, `dug`, `dogs`, `dogmatic` and `duggery` etc.

:::note
The censor words are not case-sensitive, so any combination of `DoG`, `dOG`, `doG` etc. will match `dog`.
:::

Each censor word will normally be replaced by a repeating string of the **Censor character**, which is an asterisk `*` by default. A three-letter censored word will be replaced with three asterisks `***`, while `dogmatic`, having been matched by `dog*` will be replaced with eight asterisks `********`.

### Special replacements

Alternatively, each censor word can have a replacement word, so you could have `dog` replaced with `canine` by entering the replacement word into the **Replacement** box next to `dog`.