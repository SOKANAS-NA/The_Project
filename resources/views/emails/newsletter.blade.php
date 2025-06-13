<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Newsletter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #f8f9fa;
            margin-bottom: 20px;
        }
        .content {
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #dee2e6;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            font-size: 12px;
            color: #6c757d;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Newsletter Sportive</h1>
    </div>

    <div class="content">
        {!! $content !!}
    </div>

    <div class="footer">
        <p>Vous recevez cet email car vous êtes inscrit à notre newsletter.</p>
        <p>
            <a href="{{ url('/newsletter/unsubscribe') }}">Se désinscrire</a>
        </p>
    </div>
</body>
</html> 