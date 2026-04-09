# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .

# 🔥 FIX: specify project path
RUN dotnet publish TaskBoard.API/TaskBoard.API.csproj -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

EXPOSE 10000

CMD ["dotnet", "TaskBoard.API.dll"]
