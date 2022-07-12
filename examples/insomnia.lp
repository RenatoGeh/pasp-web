% Example 9 of On the Semantics and Complexity of Probabilistic Logic Programs. Fabio Cozman and
% Denis Mauá. Journal of Artificial Intelligence Research. 2017.

sleep :- not work, not insomnia. work :- not sleep.
0.3::insomnia.

% A contradiction (cycle) appears when insomnia is not true, in which case we turn to credal sets.
#query(insomnia)
#query(work)
#query(sleep)
#query(not sleep)
#query(not work)
