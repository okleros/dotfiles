# Fish colors
set -g fish_color_command --bold green
set -g fish_color_error red
set -g fish_color_quote yellow
set -g fish_color_param white
set -g fish_pager_color_selected_completion blue

# Some config
set -g fish_greeting
# Git config
set -g __fish_git_prompt_show_informative_status 1
set -g __fish_git_prompt_showupstream informative
set -g __fish_git_prompt_showdirtystate yes
set -g __fish_git_prompt_char_stateseparator ' '
set -g __fish_git_prompt_char_cleanstate '✔'
set -g __fish_git_prompt_char_dirtystate '✚'
set -g __fish_git_prompt_char_invalidstate '✖'
set -g __fish_git_prompt_char_stagedstate '●'
set -g __fish_git_prompt_char_stashstate '⚑'
set -g __fish_git_prompt_char_untrackedfiles '?'
set -g __fish_git_prompt_char_upstream_ahead '>>'
set -g __fish_git_prompt_char_upstream_behind '<<'
set -g __fish_git_prompt_char_upstream_diverged '!'
set -g __fish_git_prompt_char_upstream_equal '='
set -g __fish_git_prompt_char_upstream_prefix ''''

# User abbreviations
abbr -a -g h 'history'																								# Show history
abbr -a -g please 'sudo'																						# Polite way to sudo
abbr -a -g fucking 'sudo'																						# Rude way to sudo
abbr -a -g fish_priv 'fish --private'																				# Fish incognito mode
abbr -a -g untar 'tar -zxvf'																					# Untar
abbr -a -g edit 'subl'
abbr -a -g install 'sudo pacman -S'
abbr -a -g ynstall 'yay -S'
abbr -a -g venv 'source .venv/bin/activate.fish'
abbr -a -g ls 'ls -la'

#end

