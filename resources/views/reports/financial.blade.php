<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">

    <title>Relatório Financeiro</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #333;
        }

        h1 {
            text-align: center;
            margin-bottom: 5px;
        }

        .periodo {
            text-align: center;
            margin-bottom: 30px;
            color: #666;
        }

        .cards {
            width: 100%;
            margin-bottom: 25px;
        }

        .card {
            border: 1px solid #ddd;
            padding: 12px;
            margin-bottom: 10px;
        }

        .card-title {
            font-size: 11px;
            color: #666;
        }

        .card-value {
            font-size: 18px;
            font-weight: bold;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background: #f2f2f2;
        }
    </style>
</head>

<body>

    <h1>Relatório Financeiro</h1>

    <div class="periodo">
        Período:
        {{ \Carbon\Carbon::parse($report['start_date'])->format('d/m/Y') }}
        até
        {{ \Carbon\Carbon::parse($report['end_date'])->format('d/m/Y') }}
    </div>

    <div class="cards">

        <div class="card">
            <div class="card-title">
                Total de contas
            </div>

            <div class="card-value">
                R$ {{ number_format($report['total_accounts'], 2, ',', '.') }}
            </div>
        </div>

        <div class="card">
            <div class="card-title">
                Total pago
            </div>

            <div class="card-value">
                R$ {{ number_format($report['total_paid'], 2, ',', '.') }}
            </div>
        </div>

        <div class="card">
            <div class="card-title">
                Total pendente
            </div>

            <div class="card-value">
                R$ {{ number_format($report['total_pending'], 2, ',', '.') }}
            </div>
        </div>

        <div class="card">
            <div class="card-title">
                Total a pagar
            </div>

            <div class="card-value">
                R$ {{ number_format($report['total_payable'], 2, ',', '.') }}
            </div>
        </div>

        <div class="card">
            <div class="card-title">
                Total a receber
            </div>

            <div class="card-value">
                R$ {{ number_format($report['total_receivable'], 2, ',', '.') }}
            </div>
        </div>

        <div class="card">
            <div class="card-title">
                Total vencido
            </div>

            <div class="card-value">
                R$ {{ number_format($report['total_overdue'], 2, ',', '.') }}
            </div>
        </div>

    </div>

    <h2>Contas</h2>

    <table>

        <thead>
            <tr>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Vencimento</th>
            </tr>
        </thead>

        <tbody>

            @foreach($accounts as $account)

                <tr>

                    <td>
                        {{ $account->description }}
                    </td>

                    <td>
                        {{ $account->type === 'payable'
                            ? 'A pagar'
                            : 'A receber'
                        }}
                    </td>

                    <td>
                        {{ $account->status }}
                    </td>

                    <td>
                        R$
                        {{ number_format($account->amount, 2, ',', '.') }}
                    </td>

                    <td>
                        {{ \Carbon\Carbon::parse($account->due_date)->format('d/m/Y') }}
                    </td>

                </tr>

            @endforeach

        </tbody>

    </table>

</body>
</html>

