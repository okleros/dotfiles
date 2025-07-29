function fish_prompt
    set -l prompt_symbol ' ➜  '

    echo -s ' '(set_color --bold green) (date +%H:%M)' '\
    (set_color --bold -u cyan) $USER (set_color normal)' ' \
    (set_color magenta) (prompt_pwd) \
    (set_color --bold bryellow) $prompt_symbol (set_color normal)
end
#    echo -n (date +%H:%M) (prompt_pwd)
#function fish_prompt -d "Write out the prompt"
#    set -l prompt_symbol ' ➜  '
#    printf '%s%s@%s%s %s%s%s%s%s' (set_color $fish_color_cwd) \
#    (whoami) (set_color normal) (hostname | cut -d . -f 1) \
#    (set_color $fish_color_cwd) (prompt_pwd) (set_color yellow) \
#    $prompt_symbol (set_color normal)
#end
