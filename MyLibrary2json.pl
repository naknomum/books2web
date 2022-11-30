#!/usr/bin/perl

use JSON;
use Spreadsheet::Read qw(ReadData rows);

my $book = ReadData('MyLibrary.xls');

# for now we are assuming it is sheet 1
my $sheet = $book->[1];

my @rows = rows($sheet);
my $keys = shift(@rows);
foreach my $row (@rows) {
    foreach (@$row) {
        $_ = undef if ($_ eq '');
    }
}

my $out = { 'keys' => $keys, data => \@rows };

print to_json($out, {utf8=>1, pretty=>1});
